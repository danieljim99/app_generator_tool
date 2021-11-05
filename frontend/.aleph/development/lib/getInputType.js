const getInputType = (type)=>{
    switch(type){
        default:
        case "string":
            return "text";
            break;
        case "number":
            return "number";
            break;
        case "boolean":
            return "checkbox";
            break;
    }
};
export default getInputType;

//# sourceMappingURL=getInputType.js.map