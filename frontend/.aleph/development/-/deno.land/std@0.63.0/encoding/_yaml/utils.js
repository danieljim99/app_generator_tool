// https://deno.land/std@0.63.0/encoding/_yaml/utils.ts
function isNothing(subject) {
  return typeof subject === "undefined" || subject === null;
}
function isArray(value) {
  return Array.isArray(value);
}
function isBoolean(value) {
  return typeof value === "boolean" || value instanceof Boolean;
}
function isNull(value) {
  return value === null;
}
function isNumber(value) {
  return typeof value === "number" || value instanceof Number;
}
function isString(value) {
  return typeof value === "string" || value instanceof String;
}
function isSymbol(value) {
  return typeof value === "symbol";
}
function isUndefined(value) {
  return value === void 0;
}
function isObject(value) {
  return value !== null && typeof value === "object";
}
function isError(e) {
  return e instanceof Error;
}
function isFunction(value) {
  return typeof value === "function";
}
function isRegExp(value) {
  return value instanceof RegExp;
}
function toArray(sequence) {
  if (isArray(sequence))
    return sequence;
  if (isNothing(sequence))
    return [];
  return [sequence];
}
function repeat(str, count) {
  let result = "";
  for (let cycle = 0; cycle < count; cycle++) {
    result += str;
  }
  return result;
}
function isNegativeZero(i) {
  return i === 0 && Number.NEGATIVE_INFINITY === 1 / i;
}
export {
  isArray,
  isBoolean,
  isError,
  isFunction,
  isNegativeZero,
  isNothing,
  isNull,
  isNumber,
  isObject,
  isRegExp,
  isString,
  isSymbol,
  isUndefined,
  repeat,
  toArray
};
