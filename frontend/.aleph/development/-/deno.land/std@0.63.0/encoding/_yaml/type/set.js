// https://deno.land/std@0.63.0/encoding/_yaml/type/set.ts
import { Type } from "../type.js";
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function resolveYamlSet(data) {
  if (data === null)
    return true;
  for (const key in data) {
    if (_hasOwnProperty.call(data, key)) {
      if (data[key] !== null)
        return false;
    }
  }
  return true;
}
function constructYamlSet(data) {
  return data !== null ? data : {};
}
var set = new Type("tag:yaml.org,2002:set", {
  construct: constructYamlSet,
  kind: "mapping",
  resolve: resolveYamlSet
});
export {
  set
};
