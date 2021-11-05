var _s = $RefreshSig$();
import { useDeno } from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
import { YamlLoader } from "../-/deno.land/x/yaml_loader@v0.1.0/mod.js";
const availableTypes = [
    "string",
    "number",
    "boolean"
];
const readYaml = async (path)=>{
    const yamlLoader = new YamlLoader();
    let result = await yamlLoader.parseFile(path);
    if (!result) {
        throw new Error("The yaml file seems to be empty");
    }
    if (!result.hasOwnProperty("types")) {
        throw new Error("The yaml file needs a 'types' field");
    } else {
        if (!result.types) {
            throw new Error("The 'types' field  in the yaml file seems to be empty");
        }
        if (typeof result.types !== "object") {
            throw new Error("The 'types' field in the yaml file has a wrong type");
        } else {
            let names = [];
            result.types.forEach((type, index)=>{
                if (!type.hasOwnProperty("name") || !type.hasOwnProperty("fields") || type.hasOwnProperty("name") && typeof type.name !== "string" || type.hasOwnProperty("fields") && typeof type.fields !== "object") {
                    throw new Error("Each type must have a 'name' field of type 'string' and a 'fields' field with yaml list format");
                }
                if (type.name.charAt(0) === type.name.charAt(0).toLocaleLowerCase()) {
                    throw new Error("The value of the 'name' field of each type must start with upper case");
                }
                if (names.includes(type.name)) {
                    throw new Error("The value of the 'name' field of each type must be unique and cannot be used for more than one type at the same time");
                }
                type.fields.forEach((field)=>{
                    if (!field.hasOwnProperty("name") || !field.hasOwnProperty("type") || field.hasOwnProperty("name") && typeof field.name !== "string" || field.hasOwnProperty("type") && typeof field.type !== "string" || field.hasOwnProperty("type") && typeof field.type === "string" && !availableTypes.includes(field.type)) {
                        throw new Error(`The 'fields' field must have a yaml list of a 'name' field of type 'string' and a 'type' field of type 'string' using one of the following values: ${availableTypes.toString()}`);
                    }
                });
                names.push(type.name);
            });
        }
    }
    result = {
        types: result.types?.map((type)=>({
                ...type,
                fields: [
                    {
                        name: '_id',
                        type: "string"
                    },
                    ...type.fields
                ]
            })
        )
    };
    return result;
};
const getTypes = async ()=>{
    _s();
    const yamlPath = useDeno(()=>Deno.env.get("YAML_FILE")
    , null, "useDeno-YkIN3TYHKS2kxSYsfPqTybXBlXw");
    if (!yamlPath) throw new Error("No yaml path found on .env file");
    let content;
    try {
        content = await readYaml(yamlPath);
    } catch (error) {
        content = error.message;
        return content;
    }
    return content.types;
};
_s(getTypes, "TZyHkZriyJi2zfIRrvUg0N54gZY=", false, function() {
    return [
        useDeno
    ];
});
export default getTypes;

//# sourceMappingURL=getTypes.js.map