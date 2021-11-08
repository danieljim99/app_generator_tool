import { useDeno } from 'aleph/react';
import { YamlLoader } from 'yaml_loader';

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
        let fieldsNames: string[] = [];
        type.fields.forEach((field: any) => {
          if (
            !field.hasOwnProperty("name") ||
            !field.hasOwnProperty("type") ||
            field.hasOwnProperty("name") && typeof(field.name) !== "string" ||
            field.hasOwnProperty("type") && typeof(field.type) !== "string" ||
            field.hasOwnProperty("type") && typeof(field.type) === "string" && !availableTypes.includes(field.type)
          ) {
            throw new Error(
              `The 'fields' field must have a yaml list of a 'name' field of type 'string' and a 'type' field of type 'string' using one of the following values: ${availableTypes.toString()}`
            );
          }
          if (fieldsNames.includes(field.name)) {
            throw new Error("The name of the fields inside of a type must be unique and cannot be used for more than one field at the same time");
          }
          fieldsNames.push(field.name);
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

const getTypes = async () => {
  const yamlPath = useDeno(() => Deno.env.get("YAML_FILE"));

  if (!yamlPath) throw new Error("No yaml path found on .env file");

  let content: YamlResult;

  try {
    content = await readYaml(yamlPath);
  } catch(error) {
    content = error.message;
    return content;
  }

  return content.types;
};

export default getTypes;
