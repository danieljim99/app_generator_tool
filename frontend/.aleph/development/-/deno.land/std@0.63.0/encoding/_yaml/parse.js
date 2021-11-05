// https://deno.land/std@0.63.0/encoding/_yaml/parse.ts
import { load, loadAll } from "./loader/loader.js";
function parse(content, options) {
  return load(content, options);
}
function parseAll(content, iterator, options) {
  return loadAll(content, iterator, options);
}
export {
  parse,
  parseAll
};
