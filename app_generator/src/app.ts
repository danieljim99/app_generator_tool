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

const generateFields = (type: Object, createdTypes: typeof GraphQLObjectType[]) => {
    let result: Object = {};

    Object.keys(Object.values(type)[0]).forEach((key, index) => {
        Object.defineProperty(result, key, {
            writable: true,
            enumerable: true,
            configurable: true,
            value: {
                type: getGraphQLType(
                    Object.values(Object.values(type)[0])[index] as unknown as string,
                    createdTypes
                )
            },
        });
    });

    return result;
};

const createObjectTypes = async (types: Object[]) => {
    let result: any[] = [];

    for (let type of types) {
        result.push(new GraphQLObjectType({
            name: Object.keys(type)[0],
            fields: generateFields(type, result),
        }));
    }

    return result;
};

const createSchema = async (types: Object[]) => {
    const db = await connectDB();
    const objectTypes = await createObjectTypes(types);
    const queryObjectType = new GraphQLObjectType({
        name: "Query",
        fields: {
            getAllUser: {
                type: new GraphQLList(objectTypes[0]),
            },
            getAllActivity: {
                type: new GraphQLList(objectTypes[1]),
            }
        },
    });
    const schema = new GraphQLSchema({
        query: queryObjectType,
    });
    const resolver = {
        //TO-DO: Generate resolvers automatically
            //Query
                //get(first attrb)
                //getAll(filters?)
            //Mutation
                //create(attrbs)
                //remove(first attrb)
                //update(first attrb, attrbs)
            //
        //
        getAllUser: async () => {
            return (await db.collection("UserCollection").find()).toArray();
        },
        getAllActivity: async () => {
            return (await db.collection("ActivityCollection").find()).toArray();
        },
    };
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
