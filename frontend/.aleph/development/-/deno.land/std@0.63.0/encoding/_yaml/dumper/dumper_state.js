// https://deno.land/std@0.63.0/encoding/_yaml/dumper/dumper_state.ts
import { State } from "../state.js";
var _hasOwnProperty = Object.prototype.hasOwnProperty;
function compileStyleMap(schema, map) {
  if (typeof map === "undefined" || map === null)
    return {};
  let type;
  const result = {};
  const keys = Object.keys(map);
  let tag, style;
  for (let index = 0, length = keys.length; index < length; index += 1) {
    tag = keys[index];
    style = String(map[tag]);
    if (tag.slice(0, 2) === "!!") {
      tag = `tag:yaml.org,2002:${tag.slice(2)}`;
    }
    type = schema.compiledTypeMap.fallback[tag];
    if (type && typeof type.styleAliases !== "undefined" && _hasOwnProperty.call(type.styleAliases, style)) {
      style = type.styleAliases[style];
    }
    result[tag] = style;
  }
  return result;
}
var DumperState = class extends State {
  constructor({
    schema,
    indent = 2,
    noArrayIndent = false,
    skipInvalid = false,
    flowLevel = -1,
    styles = null,
    sortKeys = false,
    lineWidth = 80,
    noRefs = false,
    noCompatMode = false,
    condenseFlow = false
  }) {
    super(schema);
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = [];
    this.indent = Math.max(1, indent);
    this.noArrayIndent = noArrayIndent;
    this.skipInvalid = skipInvalid;
    this.flowLevel = flowLevel;
    this.styleMap = compileStyleMap(this.schema, styles);
    this.sortKeys = sortKeys;
    this.lineWidth = lineWidth;
    this.noRefs = noRefs;
    this.noCompatMode = noCompatMode;
    this.condenseFlow = condenseFlow;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
  }
};
export {
  DumperState
};
