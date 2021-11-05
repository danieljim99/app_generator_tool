// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/CustomScript.ts
import {
  useContext
} from "../../../../../../esm.sh/react@17.0.2.js";
import { SSRContext } from "../context.js";
import { inDeno } from "../helper.js";
function CustomScript(props) {
  const { scripts } = useContext(SSRContext);
  if (inDeno) {
    const key = "script-" + (scripts.size + 1);
    scripts.set(key, { props });
  }
  return null;
}
export {
  CustomScript as default
};
