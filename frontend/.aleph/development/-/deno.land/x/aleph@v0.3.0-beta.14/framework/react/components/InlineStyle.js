// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/InlineStyle.ts
import { useContext, useEffect, useLayoutEffect } from "../../../../../../esm.sh/react@17.0.2.js";
import { applyCSS, removeCSS } from "../../core/style.js";
import { SSRContext } from "../context.js";
import { inDeno } from "../helper.js";
var useIsomorphicLayoutEffect = inDeno ? useEffect : useLayoutEffect;
function InlineStyle({ children, ...rest }) {
  const { inlineStyles } = useContext(SSRContext);
  const { __styleId: id } = rest;
  const css = children?.toString();
  if (id && css) {
    if (inDeno) {
      inlineStyles.set("#" + id, css);
    } else {
      applyCSS("#" + id, { css });
    }
  }
  useIsomorphicLayoutEffect(() => () => id && removeCSS("#" + id), []);
  return null;
}
export {
  InlineStyle as default
};
