// https://deno.land/x/yaml_loader@v0.1.0/yaml_loader.ts
import { parse as parseYaml } from "../../std@0.63.0/encoding/yaml.js";
var YamlLoader = class {
  constructor() {
    this.decoder = new TextDecoder("utf-8");
  }
  async parseFile(filePath) {
    const yamlFile = await Deno.readFile(filePath);
    const yamlText = this.decoder.decode(yamlFile);
    return await parseYaml(yamlText);
  }
};
export {
  YamlLoader
};
