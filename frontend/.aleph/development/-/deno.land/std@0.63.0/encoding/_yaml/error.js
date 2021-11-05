// https://deno.land/std@0.63.0/encoding/_yaml/error.ts
var YAMLError = class extends Error {
  constructor(message = "(unknown reason)", mark = "") {
    super(`${message} ${mark}`);
    this.mark = mark;
    this.name = this.constructor.name;
  }
  toString(_compact) {
    return `${this.name}: ${this.message} ${this.mark}`;
  }
};
export {
  YAMLError
};
