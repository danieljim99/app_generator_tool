import {
    Application,
    Bson,
    config,
    graphql,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLInputObjectType,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    MongoClient,
    Router,
    YamlLoader
} from "../deps.ts";

interface YamlResult {
    types?: any
};

const availableTypes = ["string", "number", "boolean"];

const readYaml = async (path: string) => {
    const yamlLoader = new YamlLoader();
    let result: YamlResult = await yamlLoader.parseFile(path) as YamlResult;

    if (!result) {
        throw new Error("The yaml file seems to be empty");
    }

    if (!result.hasOwnProperty("types")) {
        throw new Error("The yaml file needs a 'types' field");
    } else {
        if (!result.types) {
            throw new Error("The 'types' field  in the yaml file seems to be empty");
        }
        if (typeof(result.types) !== "object") {
            throw new Error("The 'types' field in the yaml file has a wrong type");
        } else {
            let names: string[] = [];
            result.types.forEach((type: any, index: number) => {
                if (
                    !type.hasOwnProperty("name") ||
                    !type.hasOwnProperty("fields") ||
                    type.hasOwnProperty("name") && typeof(type.name) !== "string" ||
                    type.hasOwnProperty("fields") && typeof(type.fields) !== "object"
                ) {
                    throw new Error("Each type must have a 'name' field of type 'string' and a 'fields' field with yaml list format");
                }
                if ((type.name as string).charAt(0) === (type.name as string).charAt(0).toLocaleLowerCase()) {
                    throw new Error("The value of the 'name' field of each type must start with upper case");
                }
                if (names.includes(type.name)) {
                    throw new Error("The value of the 'name' field of each type must be unique and cannot be used for more than one type at the same time");
                }
                type.fields.forEach((field: any) => {
                    if (
                        !field.hasOwnProperty("name") ||
                        !field.hasOwnProperty("type") ||
                        field.hasOwnProperty("name") && typeof(field.name) !== "string" ||
                        field.hasOwnProperty("type") && typeof(field.type) !== "string" ||
                        field.hasOwnProperty("type") && typeof(field.type) === "string" && !availableTypes.includes(field.type)) {
                        throw new Error(
                            `The 'fields' field must have a yaml list of a 'name' field of type 'string' and a 'type' field of type 'string' using one of the following values: ${availableTypes.toString()}`
                        );
                    }
                });
                names.push(type.name);
            });
        }
    }

    result = {
        types: (result.types as any[])?.map(type => ({ ...type, fields: [{ name: '_id', type: "string" }, ...type.fields] }))
    };

    return result;
};

const connectDB = async () => {
    const client = new MongoClient();
    await client.connect(config().MONGO_URL);
    const db = client.database("generator");
    return db;
};

const getGraphQLType = (type: string, createdTypes: typeof GraphQLObjectType[]) => {
    let result;
    let isArray = type.includes("[]");

    type = isArray ? type.slice(2) : type;

    switch (type) {
        default:
            result = createdTypes.find(createdType => createdType.name === type);
            if (!result) {
                throw new Error(`The type ${type} does not exist`);
            }
            if (isArray) {
                result = GraphQLList(result);
            }
            break;
        case "string":
            result = isArray ? GraphQLList(GraphQLString) : GraphQLString;
            break;
        case "number":
            result = isArray ? GraphQLList(GraphQLInt) : GraphQLInt;
            break;
        case "boolean":
            result = isArray ? GraphQLList(GraphQLBoolean) : GraphQLBoolean;
            break;
    };

    return result;
};

const generateTypeFields = (type: any, createdTypes: typeof GraphQLObjectType[]) => {
    let result: any = {};

    type.fields.forEach((field: any) => {
        result[field.name] = { type: 
            getGraphQLType(
                field.type,
                createdTypes
            )
        };
    });

    return result;
};

const generateQuerySchemaFields = (createdTypes: any[]) => {
    let result: any = {};

    for (let type of createdTypes) {
        let firstAttrName = (Object.values(type._fields())[0] as any).name;
        let firstAttrType = (Object.values(type._fields())[0] as any).type;

        // getAll...()
        result[`getAll${type.name}`] = { type: new GraphQLList(type) };

        // get...(_id)
        let argObject: any = {};
        argObject[firstAttrName] = { type: firstAttrType };
        result[`get${type.name}`] = {
            type: type,
            args: argObject
        };
    }

    return result;
};

const generateMutationSchemaFields = (createdTypes: any[]) => {
    let result: any = {};

    for (let type of createdTypes) {
        let attrs = Object.values(type._fields()).map((field: any) => (
            { name: field.name, type: field.type }
        ));
        //create...(all attr but not _id)
        let argObject: any = {};
        attrs.forEach((attr: any, index: number) => {
            if (index > 0) {
                argObject[attr.name] = { type: attr.type };
            }
        });
        let argInputObject: any = {};
        argInputObject[`${type.name}Input`] = {
            type: new GraphQLInputObjectType({
                name: `${type.name}Input`,
                fields: argObject,
            })
        };
        result[`create${type.name}`] = {
            type: type,
            args: argInputObject,
        };
        //remove...(_id)
        let firstAttrName = (Object.values(type._fields())[0] as any).name;
        let firstAttrType = (Object.values(type._fields())[0] as any).type;

        argObject = {};
        argObject[firstAttrName] = { type: firstAttrType };
        result[`remove${type.name}`] = {
            type: type,
            args: argObject
        };
        //update...(_id, allAttr)
        argObject = {};
        attrs.forEach((attr: any, index: number) => {
            if (index > 0) {
                argObject[attr.name] = { type: attr.type };
            }
        });
        let idArgObject: any = {};
        idArgObject[firstAttrName] = { type: firstAttrType };
        result[`update${type.name}`] = {
            type: type,
            args: {
                ...idArgObject,
                ...argInputObject,
            }
        };
    }

    return result;
};

const generateResolvers = async (queryType: any, mutationType: any) => {
    const db = await connectDB();
    let result: any = {};

    //query resolvers
    for (let query of Object.keys(queryType._fields)) {
        const args = queryType._fields[query].args;
        const typeName = queryType._fields[query].type.ofType?.name || queryType._fields[query].type.name;
        if (query.startsWith("getAll")) {
            //getAll...
            result[query] = async () => {
                return (await db.collection(`${typeName}Collection`).find()).toArray();
            };
        } else if (query.startsWith("get")) {
            //get...
            result[query] = async (queryArgs: any) => {
                let filterObject: any = {};
                filterObject[args[0].name] = new Bson.ObjectId(queryArgs[args[0].name]);
                return await db.collection(`${typeName}Collection`).findOne(filterObject);
            };
        }
    }

    //mutation resolvers
    for (let mutation of Object.keys(mutationType._fields)) {
        const args = mutationType._fields[mutation].args;
        const typeName = mutationType._fields[mutation].type.ofType?.name || mutationType._fields[mutation].type.name;
        if(mutation.startsWith("create")) {
            //create...
            result[mutation] = async (mutationArgs: any) => {
                const { insertedId } = await db.collection(`${typeName}Collection`).insertOne(mutationArgs[`${typeName}Input`]);
                return {_id: insertedId, ...mutationArgs[`${typeName}Input`]};
            };
        } else if (mutation.startsWith("remove")) {
            //remove...
            result[mutation] = async (mutationArgs: any) => {
                let filterObject: any = {};
                filterObject[args[0].name] = new Bson.ObjectId(mutationArgs[args[0].name]);
                const result = await db.collection(`${typeName}Collection`).findOne(filterObject);
                if (!result) {
                    throw new Error(`${typeName} not found`);
                }
                await db.collection(`${typeName}Collection`).deleteOne(filterObject);
                return result;
            }
        } else if (mutation.startsWith("update")) {
            //update...
            result[mutation] = async (mutationArgs: any) => {
                let filterObject: any = {};
                let updateObject: any = mutationArgs[`${typeName}Input`];
                filterObject[args[0].name] = new Bson.ObjectId(mutationArgs[args[0].name]);
                const result = await db.collection(`${typeName}Collection`).findOne(filterObject);
                if (!result) {
                    throw new Error(`${typeName} not found`);
                }
                await db.collection(`${typeName}Collection`).updateOne(filterObject, { $set: updateObject});
                return await db.collection(`${typeName}Collection`).findOne(filterObject);
            }
        }
    }

    return result;
};

const createObjectTypes = async (types: any[]) => {
    let result: any[] = [];

    for (let type of types) {
        result.push(new GraphQLObjectType({
            name: type.name,
            fields: generateTypeFields(type, result),
        }));
    }

    return result;
};

const createSchema = async (types: Object[]) => {
    console.log("Generating GraphQL types...");
    const objectTypes = await createObjectTypes(types);

    console.log("Generating GraphQL schema...");
    const queryObjectType = new GraphQLObjectType({
        name: "Query",
        fields: generateQuerySchemaFields(objectTypes),
    });
    const mutationObjectType = new GraphQLObjectType({
        name: "Mutation",
        fields: generateMutationSchemaFields(objectTypes),
    });

    const schema = new GraphQLSchema({
        query: queryObjectType,
        mutation: mutationObjectType,
    });

    console.log("Generating api resolvers...");
    const resolver = await generateResolvers(queryObjectType, mutationObjectType);
    const executeSchema = async (query: any) => {
        const result = await graphql(schema, query, resolver);
        return result;
    };

    const router = new Router();
    router.post("/graphql", async ({ request, response }) => {
        if (request.hasBody) {
          const body = request.body({ type: "json" });
          const bodyValue = await body.value;
          const result = await executeSchema(bodyValue.query);
          response.body = result;
          response.headers.set("Access-Control-Allow-Origin", "http://localhost:8080");
        } else {
          response.body = "Query Unknown";
        }
    });
    const app = new Application();
    app.use(router.routes());
    app.use(router.allowedMethods());
    console.log("Server running on port 5000");
    app.listen({ port: 5000 });
};

export const app = async () => {
    try {
        const types = (await readYaml(config().YAML_FILE)).types;
        createSchema(types);
    } catch (error) {
        console.error(error.message);
    }
};
