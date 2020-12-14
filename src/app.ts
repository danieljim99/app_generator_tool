import {
    graphql,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLList,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from "https://cdn.pika.dev/graphql/15.3.0";
import { Application, Router } from "https://deno.land/x/oak@v6.2.0/mod.ts";
import { YamlLoader } from "https://deno.land/x/yaml_loader/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const readYaml = async (path: string) => {
    const yamlLoader = new YamlLoader();
    return await yamlLoader.parseFile(path) as { types: any[] };
};

const getGraphQLType = (type: string, createdTypes: GraphQLObjectType[]) => {
    let result;

    //TO-DO: Check if the type is Array

    switch (type) {
        default:
            result = createdTypes.find(createdType => createdType.name === type);
            if (!result) {
                throw new Error(`The type ${type} does not exist`);
            }
            break;
        case "string":
            result = GraphQLString;
            break;
        case "number":
            result = GraphQLInt;
            break;
        case "boolean":
            result = GraphQLBoolean;
            break;
    };

    return result;
};

const generateFields = (type: Object, createdTypes: GraphQLObjectType[]) => {
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
    let result: GraphQLObjectType[] = [];

    types.forEach(type => {
        result.push(new GraphQLObjectType({
            name: Object.keys(type)[0],
            fields: generateFields(type, result),
        }));
    });

    return result;
};

const createSchema = async (types: Object[]) => {
    const objectTypes = await createObjectTypes(types);
    const queryObjectType = new GraphQLObjectType({
        name: "Query",
        fields: {
            getUsers: {
                type: new GraphQLList(objectTypes[0]),
            },
            getActivities: {
                type: new GraphQLList(objectTypes[1]),
            }
        },
    });
    const schema = new GraphQLSchema({
        query: queryObjectType,
    });
    const resolver = {
        //TO-DO: Generate resolvers automatically
        getUsers: () => [
            { name: "David", email: "david@test.com" },
            { name: "Peter", email: "peter@test.com" },
        ],
        getActivities: () => [
            { name: "Activity1", author: { name: "David", email: "david@test.com" } },
            { name: "Activity2", author: { name: "Peter", email: "peter@test.com" } },
        ],
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
