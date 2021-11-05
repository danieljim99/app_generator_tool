import __ALEPH__Head from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Head.js";
import __ALEPH__StyleLink from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/StyleLink.js";
import __ALEPH__Anchor from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Anchor.js";
import "../style/index.css.js#/style/index.css@6d3429";
var _s = $RefreshSig$();
/*#__PURE__*/ import React from "../-/esm.sh/react@17.0.2.js";
import { useRouter } from "../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
const Home = (props)=>{
    _s();
    const { pathname  } = useRouter();
    return React.createElement("div", {
        className: "IndexPage",
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 8
        }
    }, React.createElement(__ALEPH__Head, {
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 9
        }
    }, React.createElement("title", {
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 10
        }
    }, "App Generator Tool"), React.createElement(__ALEPH__StyleLink, {
        rel: "stylesheet",
        href: "/style/index.css",
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 11
        }
    })), React.createElement("h1", {
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 13
        }
    }, "App Generator Tool"), React.createElement("h1", {
        className: "Title",
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 14
        }
    }, "This is the Home Page"), props.yamlTypes && React.createElement("div", {
        className: "Items",
        __source: {
            fileName: "/pages/index.tsx",
            lineNumber: 16
        }
    }, props.yamlTypes.map((type, index)=>React.createElement("div", {
            className: "Item",
            key: index,
            __source: {
                fileName: "/pages/index.tsx",
                lineNumber: 18
            }
        }, React.createElement(__ALEPH__Anchor, {
            href: `${pathname}${type.name}`,
            __source: {
                fileName: "/pages/index.tsx",
                lineNumber: 18
            }
        }, type.name))
    )));
};
_s(Home, "QpP2vYJstxsDz0K+Qwttl8PPVoY=", false, function() {
    return [
        useRouter
    ];
});
_c = Home;
export default Home;
var _c;
$RefreshReg$(_c, "Home");

//# sourceMappingURL=index.js.map