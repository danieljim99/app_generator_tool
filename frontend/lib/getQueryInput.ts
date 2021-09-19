const parseType = (value: string | boolean, type: string) => {
  switch(type) {
    default:
    case "string":
      return `"${value}"`;
    case "number":
      return parseInt(value as string);
    case "boolean":
      return value === true;
  }
};

const getQueryInput = (obj: any, fields: any) => {
  fields.splice(0, 1);
  let resultStr = "{ ";
  Object.keys(obj).forEach((key, index) => {
    resultStr += `${key}: ${parseType(Object.values(obj)[index] as string, fields[index].type)}`;
    if (index < Object.keys(obj).length - 1) resultStr += `, `;
  });
  resultStr += " }";
  return resultStr;
};
  
export default getQueryInput;
