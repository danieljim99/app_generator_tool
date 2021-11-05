// https://deno.land/std@0.63.0/encoding/_yaml/schema/default.ts
import { Schema } from "../schema.js";
import { binary, merge, omap, pairs, set, timestamp } from "../type/mod.js";
import { core } from "./core.js";
var def = new Schema({
  explicit: [binary, omap, pairs, set],
  implicit: [timestamp, merge],
  include: [core]
});
export {
  def
};
