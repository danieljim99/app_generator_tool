// https://deno.land/std@0.63.0/encoding/_yaml/type/seq.ts
import { Type } from "../type.js";
var seq = new Type("tag:yaml.org,2002:seq", {
  construct(data) {
    return data !== null ? data : [];
  },
  kind: "sequence"
});
export {
  seq
};
