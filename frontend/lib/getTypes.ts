import { useDeno } from 'aleph/react';
import { YamlLoader } from 'yaml_loader';

const readYaml = async (path: string) => {
    const yamlLoader = new YamlLoader();
    let result = await yamlLoader.parseFile(path) as { types: any[] };
    result.types = result.types.map(type => ({ ...type, fields: [{ name: '_id', type: "string" }, ...type.fields] }));
    return result;
};

const getTypes = async () => {
  const yamlPath = useDeno(() => Deno.env.get("YAML_FILE"));

  if (!yamlPath) throw new Error("No yaml path found on .env file");

  const content = await readYaml(yamlPath);

  return content.types.map(type => type.name) as string[];
};

export default getTypes;
