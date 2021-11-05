// https://deno.land/std@0.63.0/encoding/_yaml/type/str.ts
import { Type } from "../type.js";
var str = new Type("tag:yaml.org,2002:str", {
  construct(data) {
    return data !== null ? data : "";
  },
  kind: "scalar"
});
export {
  str
};
