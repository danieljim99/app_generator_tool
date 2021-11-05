// https://deno.land/std@0.63.0/encoding/_yaml/schema/failsafe.ts
import { Schema } from "../schema.js";
import { map, seq, str } from "../type/mod.js";
var failsafe = new Schema({
  explicit: [str, seq, map]
});
export {
  failsafe
};
