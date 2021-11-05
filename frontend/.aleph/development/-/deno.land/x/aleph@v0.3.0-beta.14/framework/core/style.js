// https://deno.land/x/aleph@v0.3.0-beta.14/framework/core/style.ts
import util from "../../shared/util.js";
var styleMap = new Map();
var inDeno = typeof Deno !== "undefined" && typeof Deno.version?.deno === "string";
function removeCSS(url, recoverable) {
  const { document } = window;
  Array.from(document.head.children).forEach((el) => {
    if (el.getAttribute("data-module-id") === url) {
      if (recoverable) {
        const tag = el.tagName.toLowerCase();
        if (tag === "style") {
          styleMap.set(url, { css: el.innerHTML });
        } else if (tag === "link") {
          const href = el.getAttribute("href");
          if (href) {
            styleMap.set(url, { href });
          }
        }
      }
      document.head.removeChild(el);
    }
  });
}
function recoverCSS(url) {
  if (styleMap.has(url)) {
    applyCSS(url, styleMap.get(url));
  }
}
function applyCSS(url, { css, href }) {
  if (!inDeno) {
    const { document } = window;
    const ssrEl = Array.from(document.head.children).find((el) => {
      return el.getAttribute("data-module-id") === url && el.hasAttribute("ssr");
    });
    if (ssrEl) {
      ssrEl.removeAttribute("ssr");
    } else {
      const prevEls = Array.from(document.head.children).filter((el2) => {
        return el2.getAttribute("data-module-id") === url;
      });
      const clean = () => {
        setTimeout(() => {
          if (prevEls.length > 0) {
            prevEls.forEach((el2) => document.head.removeChild(el2));
          }
        }, 0);
      };
      let el;
      if (util.isFilledString(css)) {
        el = document.createElement("style");
        el.type = "text/css";
        el.appendChild(document.createTextNode(css));
        clean();
      } else if (util.isFilledString(href)) {
        el = document.createElement("link");
        el.rel = "stylesheet";
        el.href = href;
        el.onload = clean;
      } else {
        throw new Error("applyCSS: missing css");
      }
      el.setAttribute("data-module-id", url);
      document.head.appendChild(el);
    }
  }
}
export {
  applyCSS,
  recoverCSS,
  removeCSS
};
