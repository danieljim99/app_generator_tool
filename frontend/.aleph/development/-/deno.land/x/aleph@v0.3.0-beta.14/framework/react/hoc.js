// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/hoc.ts
import {
  createElement,
  useContext,
  useEffect,
  useState
} from "../../../../../esm.sh/react@17.0.2.js";
import { FallbackContext } from "./context.js";
import { isLikelyReactComponent } from "./helper.js";
import { useRouter } from "./hooks.js";
function withRouter(Component) {
  return function WithRouter(props) {
    const router = useRouter();
    return createElement(Component, { ...props, router });
  };
}
function dynamic(factory) {
  const DynamicComponent = (props) => {
    const [mod, setMod] = useState(null);
    const [err, setErr] = useState(null);
    const { to } = useContext(FallbackContext);
    useEffect(() => {
      factory().then(({ default: component }) => {
        if (isLikelyReactComponent(component)) {
          setMod({ component });
        } else {
          setErr(new Error("Missing the react component exported as default"));
        }
      }).catch((err2) => {
        setErr(err2);
        console.error(err2.stack);
      });
    }, []);
    if (err !== null) {
      return createElement("span", {
        style: {
          color: "red",
          fontWeight: "bold"
        }
      }, err.message);
    }
    if (mod !== null) {
      return createElement(mod.component, props);
    }
    return to;
  };
  DynamicComponent.displayName = "Dynamic";
  return DynamicComponent;
}
export {
  dynamic,
  withRouter
};
