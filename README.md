# APP GENERATOR TOOL

## USAGE
* Define the types that are going to be used by the app in a yaml file.
* In the *.env* file add the yaml file path as it is in .env.sample file.
* Run *deno run --allow-read --allow-write index.ts* in the root folder.

## YAML FILE FORMAT
* All types must be inside the *types* array.
* The attributes types must be existing types in *TypeScript* or types defined in the yaml file.
* The first attribute must be an unique attribute of that type.
* In short, follow the *sample.yaml* format.
