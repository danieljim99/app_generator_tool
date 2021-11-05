import __ALEPH__Head from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Head.js";
import __ALEPH__StyleLink from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/StyleLink.js";
import __ALEPH__Anchor from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/components/Anchor.js";
import "../../style/index.css.js#/style/index.css@6d3429";
var _s = $RefreshSig$();
/*#__PURE__*/ import React, { useEffect, useState } from "../../-/esm.sh/react@17.0.2.js";
import { useRouter } from "../../-/deno.land/x/aleph@v0.3.0-beta.14/framework/react/mod.js";
import { getInitialValue, getInputType, getQueryInput } from "../../lib/index.js#/lib/index.ts@12500a";
const ItemPage = (props)=>{
    _s();
    const { params  } = useRouter();
    const typeName = params.typeName;
    const id = params.id;
    const type = props.yamlTypes?.find((type)=>type.name === typeName
    );
    const [itemData, setItemData] = useState(undefined);
    const [obj, setObj] = useState(undefined);
    const [error, setError] = useState(false);
    const [values, setValues] = useState({
    });
    const isNew = id === "new";
    const createHandler = (event)=>{
        event.preventDefault();
        let valuesObj = {
            ...values
        };
        delete valuesObj._id;
        fetch(props.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "query": `mutation{create${typeName}(${typeName}Input: ${getQueryInput(valuesObj, type.fields)}){_id}}`
            })
        }).then((response)=>response.json().then((obj)=>window.location.href = `http://localhost:8080/${typeName}/${obj.data?.[`create${typeName}`]._id}`
            )
        ).catch(()=>setError(true)
        );
    };
    const updateHandler = (event)=>{
        event.preventDefault();
        let valuesObj = {
            ...values
        };
        delete valuesObj._id;
        fetch(props.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "query": `mutation{update${typeName}(_id: "${id}", ${typeName}Input: ${getQueryInput(valuesObj, type.fields)}){_id}}`
            })
        }).then(()=>alert("Success")
        ).catch(()=>setError(true)
        );
    };
    const removeHandler = (event)=>{
        event.preventDefault();
        fetch(props.apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "text/plain"
            },
            body: JSON.stringify({
                "query": `mutation{remove${typeName}(_id: "${id}"){_id}}`
            })
        }).then(()=>window.location.href = `http://localhost:8080/${typeName}`
        ).catch((e)=>setError(true)
        );
    };
    useEffect(()=>{
        if (obj) setItemData(obj.data?.[`get${typeName}`]);
    }, [
        obj
    ]);
    useEffect(()=>{
        if (isNew) {
            let dataObject = {
            };
            type.fields.forEach((field)=>{
                dataObject[field.name] = getInitialValue(field.type);
            });
            setItemData(dataObject);
        } else {
            fetch(props.apiUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain"
                },
                body: JSON.stringify({
                    "query": `{get${typeName}(_id: "${id}"){${type.fields.map((field)=>field.name
                    )}}}`
                })
            }).then((response)=>response.json().then((object)=>setObj(object)
                )
            ).catch(()=>setError(true)
            );
        }
    }, [
        isNew
    ]);
    useEffect(()=>{
        if (itemData) setValues(itemData);
    }, [
        itemData
    ]);
    return React.createElement("div", {
        className: "page",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 98
        }
    }, React.createElement(__ALEPH__Head, {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 99
        }
    }, React.createElement("title", {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 100
        }
    }, "App Generator Tool"), React.createElement(__ALEPH__StyleLink, {
        rel: "stylesheet",
        href: "/style/index.css",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 101
        }
    })), React.createElement("div", {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 103
        }
    }, " > ", React.createElement(__ALEPH__Anchor, {
        href: "/",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 104
        }
    }, `Home`), " ", " > ", " ", React.createElement(__ALEPH__Anchor, {
        href: `/${typeName}`,
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 104
        }
    }, `${typeName}`)), React.createElement("h1", {
        className: "Title",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 106
        }
    }, isNew ? `This is the new ${typeName} page` : `This is the Update ${typeName} page`), error ? React.createElement("p", {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 108
        }
    }, `Error fetching the data`) : itemData && React.createElement("form", {
        className: "Form",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 110
        }
    }, !isNew && React.createElement("p", {
        className: "FormP",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 111
        }
    }, React.createElement("div", {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 112
        }
    }, `_id: `), React.createElement("input", {
        type: "text",
        readOnly: true,
        value: id,
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 113
        }
    })), type.fields.map((field, index)=>{
        if (index > 0) {
            return React.createElement("p", {
                className: "FormP",
                key: index,
                __source: {
                    fileName: "/pages/[typeName]/[id].tsx",
                    lineNumber: 118
                }
            }, React.createElement("div", {
                __source: {
                    fileName: "/pages/[typeName]/[id].tsx",
                    lineNumber: 119
                }
            }, `${field.name}: `), React.createElement("input", {
                type: getInputType(field.type),
                value: values[field.name],
                checked: values[field.name],
                onChange: (event)=>{
                    let valuesObj = {
                        ...values
                    };
                    valuesObj[field.name] = field.type === "boolean" ? event.target.checked : event.target.value;
                    setValues(valuesObj);
                },
                __source: {
                    fileName: "/pages/[typeName]/[id].tsx",
                    lineNumber: 120
                }
            }));
        }
    }), React.createElement("br", {
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 129
        }
    }), React.createElement("div", {
        className: "ButtonRow",
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 130
        }
    }, React.createElement("button", {
        className: "SubmitButton",
        onClick: (e)=>isNew ? createHandler(e) : updateHandler(e)
        ,
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 131
        }
    }, isNew ? `Add ${typeName}` : `Save changes`), !isNew && React.createElement("button", {
        className: "SubmitButton",
        onClick: (e)=>removeHandler(e)
        ,
        __source: {
            fileName: "/pages/[typeName]/[id].tsx",
            lineNumber: 132
        }
    }, `Remove`))));
};
_s(ItemPage, "0VY2WYcNyMOS2tr9I4UOfDNjtyg=", false, function() {
    return [
        useRouter
    ];
});
_c = ItemPage;
export default ItemPage;
var _c;
$RefreshReg$(_c, "ItemPage");

//# sourceMappingURL=[id].js.map