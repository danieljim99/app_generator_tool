// https://deno.land/std@0.63.0/encoding/_yaml/state.ts
import { DEFAULT_SCHEMA } from "./schema/mod.js";
var State = class {
  constructor(schema = DEFAULT_SCHEMA) {
    this.schema = schema;
  }
};
export {
  State
};
