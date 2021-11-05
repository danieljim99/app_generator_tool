import __ALEPH__Head from "./-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Head.js";
var _s = $RefreshSig$();
/*#__PURE__*/ import React, { useState } from "./-/esm.sh/react@17.0.2.js";
import { useDeno } from "./-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
import { getEnv, getTypes } from "./lib/index.js#/lib/index.ts@36224c";
import { ErrorModal } from "./components/errorModal.js#/components/errorModal.tsx@b46a7c";
export default function App({ Page , pageProps  }) {
    _s();
    const [error, setError] = useState(undefined);
    const apiUrl = getEnv("API_URL");
    const yamlTypes = useDeno(async ()=>await getTypes()
    , null, "useDeno-g6Qftf2exnqgC48GwVQH93yVyk");
    !error && typeof yamlTypes === "string" && setError(yamlTypes);
    return React.createElement("main", {
        __source: {
            fileName: "/app.tsx",
            lineNumber: 16
        }
    }, React.createElement(__ALEPH__Head, {
        __source: {
            fileName: "/app.tsx",
            lineNumber: 17
        }
    }, React.createElement("meta", {
        name: "viewport",
        content: "width=device-width",
        __source: {
            fileName: "/app.tsx",
            lineNumber: 18
        }
    })), error ? React.createElement(ErrorModal, {
        message: error,
        __source: {
            fileName: "/app.tsx",
            lineNumber: 21
        }
    }) : React.createElement(Page, Object.assign({
        apiUrl: apiUrl,
        yamlTypes: yamlTypes
    }, pageProps, {
        __source: {
            fileName: "/app.tsx",
            lineNumber: 23
        }
    })));
};
_s(App, "ijZUCfxIgmSCYni+wi7BT7fSpX8=", false, function() {
    return [
        useDeno
    ];
});
_c = App;
var _c;
$RefreshReg$(_c, "App");

//# sourceMappingURL=app.js.map