// https://deno.land/std@0.63.0/encoding/_yaml/loader/loader_state.ts
import { State } from "../state.js";
var LoaderState = class extends State {
  constructor(input, {
    filename,
    schema,
    onWarning,
    legacy = false,
    json = false,
    listener = null
  }) {
    super(schema);
    this.input = input;
    this.documents = [];
    this.lineIndent = 0;
    this.lineStart = 0;
    this.position = 0;
    this.line = 0;
    this.result = "";
    this.filename = filename;
    this.onWarning = onWarning;
    this.legacy = legacy;
    this.json = json;
    this.listener = listener;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
  }
};
export {
  LoaderState
};
