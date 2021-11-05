// https://deno.land/std@0.63.0/encoding/_yaml/type/int.ts
import { Type } from "../type.js";
import { isNegativeZero } from "../utils.js";
function isHexCode(c) {
  return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
}
function isOctCode(c) {
  return 48 <= c && c <= 55;
}
function isDecCode(c) {
  return 48 <= c && c <= 57;
}
function resolveYamlInteger(data) {
  const max = data.length;
  let index = 0;
  let hasDigits = false;
  if (!max)
    return false;
  let ch = data[index];
  if (ch === "-" || ch === "+") {
    ch = data[++index];
  }
  if (ch === "0") {
    if (index + 1 === max)
      return true;
    ch = data[++index];
    if (ch === "b") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (ch !== "0" && ch !== "1")
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    if (ch === "x") {
      index++;
      for (; index < max; index++) {
        ch = data[index];
        if (ch === "_")
          continue;
        if (!isHexCode(data.charCodeAt(index)))
          return false;
        hasDigits = true;
      }
      return hasDigits && ch !== "_";
    }
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_")
        continue;
      if (!isOctCode(data.charCodeAt(index)))
        return false;
      hasDigits = true;
    }
    return hasDigits && ch !== "_";
  }
  if (ch === "_")
    return false;
  for (; index < max; index++) {
    ch = data[index];
    if (ch === "_")
      continue;
    if (ch === ":")
      break;
    if (!isDecCode(data.charCodeAt(index))) {
      return false;
    }
    hasDigits = true;
  }
  if (!hasDigits || ch === "_")
    return false;
  if (ch !== ":")
    return true;
  return /^(:[0-5]?[0-9])+$/.test(data.slice(index));
}
function constructYamlInteger(data) {
  let value = data;
  const digits = [];
  if (value.indexOf("_") !== -1) {
    value = value.replace(/_/g, "");
  }
  let sign = 1;
  let ch = value[0];
  if (ch === "-" || ch === "+") {
    if (ch === "-")
      sign = -1;
    value = value.slice(1);
    ch = value[0];
  }
  if (value === "0")
    return 0;
  if (ch === "0") {
    if (value[1] === "b")
      return sign * parseInt(value.slice(2), 2);
    if (value[1] === "x")
      return sign * parseInt(value, 16);
    return sign * parseInt(value, 8);
  }
  if (value.indexOf(":") !== -1) {
    value.split(":").forEach((v) => {
      digits.unshift(parseInt(v, 10));
    });
    let valueInt = 0;
    let base = 1;
    digits.forEach((d) => {
      valueInt += d * base;
      base *= 60;
    });
    return sign * valueInt;
  }
  return sign * parseInt(value, 10);
}
function isInteger(object) {
  return Object.prototype.toString.call(object) === "[object Number]" && object % 1 === 0 && !isNegativeZero(object);
}
var int = new Type("tag:yaml.org,2002:int", {
  construct: constructYamlInteger,
  defaultStyle: "decimal",
  kind: "scalar",
  predicate: isInteger,
  represent: {
    binary(obj) {
      return obj >= 0 ? `0b${obj.toString(2)}` : `-0b${obj.toString(2).slice(1)}`;
    },
    octal(obj) {
      return obj >= 0 ? `0${obj.toString(8)}` : `-0${obj.toString(8).slice(1)}`;
    },
    decimal(obj) {
      return obj.toString(10);
    },
    hexadecimal(obj) {
      return obj >= 0 ? `0x${obj.toString(16).toUpperCase()}` : `-0x${obj.toString(16).toUpperCase().slice(1)}`;
    }
  },
  resolve: resolveYamlInteger,
  styleAliases: {
    binary: [2, "bin"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"],
    octal: [8, "oct"]
  }
});
export {
  int
};
