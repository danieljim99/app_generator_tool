// https://deno.land/std@0.63.0/encoding/_yaml/type.ts
var DEFAULT_RESOLVE = () => true;
var DEFAULT_CONSTRUCT = (data) => data;
function checkTagFormat(tag) {
  return tag;
}
var Type = class {
  constructor(tag, options) {
    this.kind = null;
    this.resolve = () => true;
    this.construct = (data) => data;
    this.tag = checkTagFormat(tag);
    if (options) {
      this.kind = options.kind;
      this.resolve = options.resolve || DEFAULT_RESOLVE;
      this.construct = options.construct || DEFAULT_CONSTRUCT;
      this.instanceOf = options.instanceOf;
      this.predicate = options.predicate;
      this.represent = options.represent;
      this.defaultStyle = options.defaultStyle;
      this.styleAliases = options.styleAliases;
    }
  }
};
export {
  Type
};
