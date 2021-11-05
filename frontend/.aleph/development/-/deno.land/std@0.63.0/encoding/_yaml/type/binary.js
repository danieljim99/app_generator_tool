// https://deno.land/std@0.63.0/encoding/_yaml/type/binary.ts
import { Type } from "../type.js";
var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
function resolveYamlBinary(data) {
  if (data === null)
    return false;
  let code;
  let bitlen = 0;
  const max = data.length;
  const map = BASE64_MAP;
  for (let idx = 0; idx < max; idx++) {
    code = map.indexOf(data.charAt(idx));
    if (code > 64)
      continue;
    if (code < 0)
      return false;
    bitlen += 6;
  }
  return bitlen % 8 === 0;
}
function constructYamlBinary(data) {
  const input = data.replace(/[\r\n=]/g, "");
  const max = input.length;
  const map = BASE64_MAP;
  const result = [];
  let bits = 0;
  for (let idx = 0; idx < max; idx++) {
    if (idx % 4 === 0 && idx) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    }
    bits = bits << 6 | map.indexOf(input.charAt(idx));
  }
  const tailbits = max % 4 * 6;
  if (tailbits === 0) {
    result.push(bits >> 16 & 255);
    result.push(bits >> 8 & 255);
    result.push(bits & 255);
  } else if (tailbits === 18) {
    result.push(bits >> 10 & 255);
    result.push(bits >> 2 & 255);
  } else if (tailbits === 12) {
    result.push(bits >> 4 & 255);
  }
  return new Deno.Buffer(new Uint8Array(result));
}
function representYamlBinary(object) {
  const max = object.length;
  const map = BASE64_MAP;
  let result = "";
  let bits = 0;
  for (let idx = 0; idx < max; idx++) {
    if (idx % 3 === 0 && idx) {
      result += map[bits >> 18 & 63];
      result += map[bits >> 12 & 63];
      result += map[bits >> 6 & 63];
      result += map[bits & 63];
    }
    bits = (bits << 8) + object[idx];
  }
  const tail = max % 3;
  if (tail === 0) {
    result += map[bits >> 18 & 63];
    result += map[bits >> 12 & 63];
    result += map[bits >> 6 & 63];
    result += map[bits & 63];
  } else if (tail === 2) {
    result += map[bits >> 10 & 63];
    result += map[bits >> 4 & 63];
    result += map[bits << 2 & 63];
    result += map[64];
  } else if (tail === 1) {
    result += map[bits >> 2 & 63];
    result += map[bits << 4 & 63];
    result += map[64];
    result += map[64];
  }
  return result;
}
function isBinary(obj) {
  const buf = new Deno.Buffer();
  try {
    if (0 > buf.readFromSync(obj))
      return true;
    return false;
  } catch {
    return false;
  } finally {
    buf.reset();
  }
}
var binary = new Type("tag:yaml.org,2002:binary", {
  construct: constructYamlBinary,
  kind: "scalar",
  predicate: isBinary,
  represent: representYamlBinary,
  resolve: resolveYamlBinary
});
export {
  binary
};
