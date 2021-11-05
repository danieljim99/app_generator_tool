import { useDeno } from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
const getEnv = (key)=>{
    return useDeno(()=>Deno.env.get(key)
    , null, "useDeno-xBZczApIpcZWqyyg7mmFKL4v2s") || "";
};
export default getEnv;

//# sourceMappingURL=getEnv.js.map