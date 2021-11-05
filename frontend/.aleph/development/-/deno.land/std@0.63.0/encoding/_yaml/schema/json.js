// https://deno.land/std@0.63.0/encoding/_yaml/schema/json.ts
import { Schema } from "../schema.js";
import { bool, float, int, nil } from "../type/mod.js";
import { failsafe } from "./failsafe.js";
var json = new Schema({
  implicit: [nil, bool, int, float],
  include: [failsafe]
});
export {
  json
};
