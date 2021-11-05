import __ALEPH__Head from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Head.js";
import __ALEPH__StyleLink from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/StyleLink.js";
import __ALEPH__Anchor from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Anchor.js";
import "../../style/index.css.js#/style/index.css@6d3429";
var _s = $RefreshSig$();
/*#__PURE__*/ import React, { useState, useEffect } from "../../-/esm.sh/react@17.0.2.js";
import { useRouter } from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
const Index = (props)=>{
    _s();
    const [items, setItems] = useState(undefined);
    const [obj, setObj] = useState(undefined);
    const [error, setError] = useState(false);
    const { pathname , params  } = useRouter();
    const typeName = params.typeName;
    useEffect(()=>{
        fetch(props.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "query": `{getAll${typeName}{_id}}`
            })
        }).then((response)=>response.json().then((object)=>setObj(object)
            )
        ).catch(()=>setError(true)
        );
    }, []);
    useEffect(()=>{
        if (obj) setItems(obj.data?.[`getAll${typeName}`]);
    }, [
        obj
    ]);
    return React.createElement("div", {
        className: "page",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 31
        }
    }, React.createElement(__ALEPH__Head, {
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 32
        }
    }, React.createElement("title", {
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 33
        }
    }, "App Generator Tool"), React.createElement(__ALEPH__StyleLink, {
        rel: "stylesheet",
        href: "/style/index.css",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 34
        }
    })), React.createElement("div", {
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 36
        }
    }, " > ", React.createElement(__ALEPH__Anchor, {
        href: "/",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 37
        }
    }, `Home`)), React.createElement("h1", {
        className: "Title",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 39
        }
    }, `This is the ${typeName} page`), error ? React.createElement("p", {
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 41
        }
    }, `Error fetching the items`) : React.createElement("div", {
        className: "Items",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 43
        }
    }, items && items.map((item)=>React.createElement("div", {
            className: "Item",
            key: item._id,
            __source: {
                fileName: "/pages/[typeName]/index.tsx",
                lineNumber: 44
            }
        }, React.createElement(__ALEPH__Anchor, {
            href: `${pathname}/${item._id}`,
            __source: {
                fileName: "/pages/[typeName]/index.tsx",
                lineNumber: 44
            }
        }, item._id))
    ), React.createElement("div", {
        className: "Item",
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 45
        }
    }, React.createElement(__ALEPH__Anchor, {
        href: `${pathname}/new`,
        __source: {
            fileName: "/pages/[typeName]/index.tsx",
            lineNumber: 45
        }
    }, "+"))));
};
_s(Index, "kRShWogcg1LefjNBl9vuSK9UGt0=", false, function() {
    return [
        useRouter
    ];
});
_c = Index;
export default Index;
var _c;
$RefreshReg$(_c, "Index");

//# sourceMappingURL=index.js.map