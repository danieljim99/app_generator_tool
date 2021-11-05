// https://deno.land/std@0.63.0/encoding/_yaml/type/map.ts
import { Type } from "../type.js";
var map = new Type("tag:yaml.org,2002:map", {
  construct(data) {
    return data !== null ? data : {};
  },
  kind: "mapping"
});
export {
  map
};
