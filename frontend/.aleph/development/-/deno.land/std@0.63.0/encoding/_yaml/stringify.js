// https://deno.land/std@0.63.0/encoding/_yaml/stringify.ts
import { dump } from "./dumper/dumper.js";
function stringify(obj, options) {
  return dump(obj, options);
}
export {
  stringify
};
