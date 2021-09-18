const getInitialValues = (type: string) => {
  switch (type) {
    case "string":
      return "";
      break;
    case "number":
      return 0;
      break;
    case "boolean":
      return false;
      break;
    default:
      return undefined;
      break;
  };
};

export default getInitialValues;
