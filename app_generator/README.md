# APP GENERATOR TOOL

## USAGE
* Define the types that are going to be used by the app in a yaml file.
* In the *.env* file add the yaml file path as it is in .env.sample file.
* Run *deno run --allow-read --allow-net index.ts* in the app_generator folder.

## YAML FILE FORMAT
* All types must be inside the *types* array.
* The attributes types must be existing types in *TypeScript* or types defined before in the yaml file.
* The first attribute must be an unique attribute of that type.
* For array types, the type name must starts with *[ ]* just like the example in sample.yaml
* In short, follow the *sample.yaml* format.
