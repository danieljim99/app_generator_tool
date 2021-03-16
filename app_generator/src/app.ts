import {
    Application,
    Bson,
    config,
    graphql,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    MongoClient,
    Router,
    YamlLoader
} from "../deps.ts";

const readYaml = async (path: string) => {
    const yamlLoader = new YamlLoader();
    return await yamlLoader.parseFile(path) as { types: any[] };
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

const generateSchemaFields = (createdTypes: any[]) => {
    let result: any = {};

    //Generate getAll query
    for (let type of createdTypes) {
        let firstAttrName = (Object.values(type._fields())[0] as any).name;
        let firstAttrType = (Object.values(type._fields())[0] as any).type;

        // getAll...()
        result[`getAll${type.name}`] = { type: new GraphQLList(type) };

        // get...(firstAttr)
        let argObject: any = {};
        argObject[firstAttrName] = { type: firstAttrType };
        result[`get${type.name}`] = {
            type: type,
            args: argObject
        };
    }

    /* ToDo generate other query/mutation
        create(all attr)
        remove(first attr)
    */

    return result;
};

const generateResolvers = async (queryType: any) => {
    const db = await connectDB();
    let result: any = {};

    //Generate GetAllResolvers
    for (let query of Object.keys(queryType._fields)) {
        const args = queryType._fields[query].args;
        const typeName = queryType._fields[query].type.ofType?.name || queryType._fields[query].type.name;
        if(query.includes("getAll")) {
            result[query] = async () => {
                return (await db.collection(`${typeName}Collection`).find()).toArray();
            };
        } else if(query.includes("get")) {
            result[query] = async (queryArgs: any) => {
                let filterObject: any = {};
                filterObject[args[0].name] = queryArgs[args[0].name];
                return await db.collection(`${typeName}Collection`).findOne(filterObject);
            };
        }
        /* ToDo generate other resolvers
            create(all attr)
            remove(first attr)
        */
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
        fields: generateSchemaFields(objectTypes),
    });
    const schema = new GraphQLSchema({
        query: queryObjectType,
    });

    console.log("Generating api resolvers...");
    const resolver = await generateResolvers(queryObjectType);
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
    const encoder = new TextEncoder();
    
    const types = (await readYaml(config().YAML_FILE)).types;

    if (!types || types.length === 0) {
        throw new Error("No types specified");
    }

    createSchema(types);
};
