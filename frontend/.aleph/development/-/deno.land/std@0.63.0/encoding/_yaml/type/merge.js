// https://deno.land/std@0.63.0/encoding/_yaml/type/merge.ts
import { Type } from "../type.js";
function resolveYamlMerge(data) {
  return data === "<<" || data === null;
}
var merge = new Type("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: resolveYamlMerge
});
export {
  merge
};
