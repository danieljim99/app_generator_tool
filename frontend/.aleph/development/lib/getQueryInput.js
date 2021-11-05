const parseType = (value, type)=>{
    switch(type){
        default:
        case "string":
            return `"${value}"`;
        case "number":
            return parseInt(value);
        case "boolean":
            return value === true;
    }
};
const getQueryInput = (obj, fields)=>{
    fields.splice(0, 1);
    let resultStr = "{ ";
    Object.keys(obj).forEach((key, index)=>{
        resultStr += `${key}: ${parseType(Object.values(obj)[index], fields[index].type)}`;
        if (index < Object.keys(obj).length - 1) resultStr += `, `;
    });
    resultStr += " }";
    return resultStr;
};
export default getQueryInput;

//# sourceMappingURL=getQueryInput.js.map