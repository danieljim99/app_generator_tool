// https://deno.land/std@0.63.0/encoding/_yaml/mark.ts
import { repeat } from "./utils.js";
var Mark = class {
  constructor(name, buffer, position, line, column) {
    this.name = name;
    this.buffer = buffer;
    this.position = position;
    this.line = line;
    this.column = column;
  }
  getSnippet(indent = 4, maxLength = 75) {
    if (!this.buffer)
      return null;
    let head = "";
    let start = this.position;
    while (start > 0 && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(start - 1)) === -1) {
      start -= 1;
      if (this.position - start > maxLength / 2 - 1) {
        head = " ... ";
        start += 5;
        break;
      }
    }
    let tail = "";
    let end = this.position;
    while (end < this.buffer.length && "\0\r\n\x85\u2028\u2029".indexOf(this.buffer.charAt(end)) === -1) {
      end += 1;
      if (end - this.position > maxLength / 2 - 1) {
        tail = " ... ";
        end -= 5;
        break;
      }
    }
    const snippet = this.buffer.slice(start, end);
    return `${repeat(" ", indent)}${head}${snippet}${tail}
${repeat(" ", indent + this.position - start + head.length)}^`;
  }
  toString(compact) {
    let snippet, where = "";
    if (this.name) {
      where += `in "${this.name}" `;
    }
    where += `at line ${this.line + 1}, column ${this.column + 1}`;
    if (!compact) {
      snippet = this.getSnippet();
      if (snippet) {
        where += `:
${snippet}`;
      }
    }
    return where;
  }
};
export {
  Mark
};
