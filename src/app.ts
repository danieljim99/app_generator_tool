import { YamlLoader } from "https://deno.land/x/yaml_loader/mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { ensureDirSync } from "https://deno.land/std/fs/mod.ts";

const readYaml = async (path: string) => {
    const yamlLoader = new YamlLoader();
    return await yamlLoader.parseFile(path) as { types: any[] };
};

const firstCapital = (word: string) => {
    let result: string = "";
    if ("[(".includes(word[0])) {
        result = `${word[0]}${word[1].toUpperCase()}${word.slice(2)}`;
    } else {
        result = `${word[0].toUpperCase()}${word.slice(1)}`;
    }
    return result;
};

const createQuery = (type: Object) => {
    const value = Object.values(type)[0];
    const key = Object.keys(type)[0];
    let result: string = "";
    result = result.concat("type Query {");
    result = result.concat(` getAll${key}: [${key}!]`);
    result = result.concat(` get${key}(${Object.keys(value)[0]}: ${firstCapital(Object.values(value)[0] as string)}!): ${key}!`);
    result = result.concat(" }");
    return result;
};

const createMutation = (type: Object) => {
    const value = Object.values(type)[0];
    const key = Object.keys(type)[0];
    let result: string = "";
    result = result.concat("type Mutation {");
    result = result.concat(` create${key}(`);
    Object.keys(value).forEach((key, index) => {
        result = result.concat(`${key}: ${firstCapital(Object.values(value)[index] as string)}! `);
    });
    result = result.concat(`): ${key}!`);
    result = result.concat(` update${key}(`);
    Object.keys(value).forEach((key, index) => {
        result = result.concat(`${key}: ${firstCapital(Object.values(value)[index] as string)}! `);
    });
    result = result.concat(`): ${key}!`);
    result = result.concat(` delete${key}(${Object.keys(value)[0]}: ${firstCapital(Object.values(value)[0] as string)}!): ${key}!`);
    result = result.concat(" }");
    return result;
};

const createType = (type: Object) => {
    const value = Object.values(type)[0];
    let result: string = "";
    result = result.concat(`type ${Object.keys(type)[0]} {`);
    Object.keys(value).forEach((key, index) => {
        result = result.concat(` ${key}: ${firstCapital(Object.values(value)[index] as string)}!`);
    })
    result = result.concat(` }`);
    return result;
}

const createSchema = (type: Object) => {
    return `${createQuery(type)}\r\n${createMutation(type)}\r\n${createType(type)}\r\n`;
};

export const app = async () => {
    const types = (await readYaml(config().YAML_FILE)).types;

    if (!types || types.length === 0) {
        throw new Error("No types specified");
    }

    const schemas = types.map(type => createSchema(type));

    const encoder = new TextEncoder();

    await ensureDirSync("./outputs");

    schemas.forEach((schema, index) => {
        Deno.writeFile(`./outputs/${index}.graphql`, encoder.encode(schema));
    });
};
