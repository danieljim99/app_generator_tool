// https://deno.land/x/aleph@v0.3.0-beta.14/framework/react/hooks.ts
import { useContext, useMemo } from "../../../../../esm.sh/react@17.0.2.js";
import events from "../core/events.js";
import { RouterContext } from "./context.js";
import { inDeno } from "./helper.js";
var AsyncUseDenoError = class extends Error {
};
function useRouter() {
  return useContext(RouterContext);
}
function useDeno(callback, options) {
  const { key, revalidate } = options || {};
  const uuid = arguments[2];
  const router = useRouter();
  const id = useMemo(() => [uuid, key].filter(Boolean).join("-"), [key]);
  return useMemo(() => {
    const global = window;
    const href = router.toString();
    const dataUrl = `pagedata://${href}`;
    if (inDeno) {
      const renderingData = global[`rendering-${dataUrl}`];
      if (renderingData && id in renderingData) {
        return renderingData[id];
      }
      const value = callback();
      const expires = typeof revalidate === "number" && !isNaN(revalidate) ? Date.now() + revalidate * 1e3 : 0;
      events.emit(`useDeno-${dataUrl}`, { id, value, expires });
      if (value instanceof Promise) {
        throw new AsyncUseDenoError();
      }
      if (renderingData) {
        renderingData[id] = value;
      }
      return value;
    }
    const data = global[`${dataUrl}#${id}`];
    return data?.value;
  }, [id, router]);
}
export {
  AsyncUseDenoError,
  useDeno,
  useRouter
};
