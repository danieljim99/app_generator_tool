// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Fallback.ts
import {
  createElement
} from "../../../../../../esm.sh/react@17.0.2.js";
import { FallbackContext } from "../context.js";
function Fallback(props) {
  return createElement(FallbackContext.Provider, {
    value: { to: props.to },
    children: props.children
  });
}
export {
  Fallback as default
};
