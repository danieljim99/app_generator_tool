// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/StyleLink.ts
import { useEffect, useLayoutEffect } from "../../../../../../esm.sh/react@17.0.2.js";
import { recoverCSS, removeCSS } from "../../core/style.js";
import { inDeno } from "../helper.js";
var useIsomorphicLayoutEffect = inDeno ? useEffect : useLayoutEffect;
function StyleLink({ href }) {
  if (!inDeno) {
    recoverCSS(href);
  }
  useIsomorphicLayoutEffect(() => {
    return () => removeCSS(href, true);
  }, []);
  return null;
}
export {
  StyleLink as default
};
