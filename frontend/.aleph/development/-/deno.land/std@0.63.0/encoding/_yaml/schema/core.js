// https://deno.land/std@0.63.0/encoding/_yaml/schema/core.ts
import { Schema } from "../schema.js";
import { json } from "./json.js";
var core = new Schema({
  include: [json]
});
export {
  core
};
