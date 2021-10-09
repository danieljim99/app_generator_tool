import React, { useEffect, useState } from 'react';
import { useRouter } from 'aleph/react';
import { getInitialValue, getInputType, getQueryInput } from '~/lib/index.ts';

const ItemPage = (props: { apiUrl: string, yamlTypes: any[] }) => {
  const { params } = useRouter();

  const typeName = params.typeName;
  const id = params.id;

  const type = props.yamlTypes?.find(type => type.name === typeName);

  const [itemData, setItemData] = useState<any>(undefined);
  const [obj, setObj] = useState<any>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [values, setValues] = useState<any>({});

  const isNew = id === "new";

  const createHandler = (event: any) => {
    event.preventDefault();
    let valuesObj = {...values};
    delete valuesObj._id;
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `mutation{create${typeName}(${typeName}Input: ${getQueryInput(valuesObj, type.fields)}){_id}}`})
      }
    ).then((response: any) => response.json()
      .then((obj: any) => window.location.href = `http://localhost:8080/${typeName}/${obj.data?.[`create${typeName}`]._id}`))
    .catch(() => setError(true));
  };

  const updateHandler = (event: any) => {
    event.preventDefault();
    let valuesObj = {...values};
    delete valuesObj._id;
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `mutation{update${typeName}(_id: "${id}", ${typeName}Input: ${getQueryInput(valuesObj, type.fields)}){_id}}`})
      }
    ).then(() => alert("Success"))
    .catch(() => setError(true));
  };

  const removeHandler = (event: any) => {
    event.preventDefault();
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `mutation{remove${typeName}(_id: "${id}"){_id}}`})
      }
    ).then(() => window.location.href = `http://localhost:8080/${typeName}`)
    .catch((e) => setError(true));
  };

  useEffect(() => {
    if (obj) setItemData(obj.data?.[`get${typeName}`]);
  }, [obj]);

  useEffect(() => {
    if (isNew) {
      let dataObject: any = {};
      type.fields.forEach((field: any) => {
        dataObject[field.name] = getInitialValue(field.type);
      });
      setItemData(dataObject);
    } else {
      fetch(
        props.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({"query": `{get${typeName}(_id: "${id}"){${type.fields.map((field: any) => field.name)}}}`})
        }
      ).then((response: any) => response.json().then((object: any) => setObj(object)))
      .catch(() => setError(true));
    }
  }, [isNew]);

  useEffect(() => {
    if (itemData) setValues(itemData);
  }, [itemData]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <div>
        {" > "}<a href="/">{`Home`}</a> {" > "} <a href={`/${typeName}`}>{`${typeName}`}</a>
      </div>
      <h1 className="Title">{isNew ? `This is the new ${typeName} page` : `This is the Update ${typeName} page`}</h1>
      {error ?
        <p>{`Error fetching the data`}</p>
      : itemData &&
        <form className="Form">
          {!isNew && <p className="FormP">
            <div>{`_id: `}</div>
            <input type="text" readOnly={true} value={id} />
          </p>}
          {type.fields.map((field: any, index: number) => {
            if (index > 0) {
              return (
                <p className="FormP" key={index}>
                  <div>{`${field.name}: `}</div>
                  <input type={getInputType(field.type)} value={values[field.name]} checked={values[field.name]} onChange={(event: any) => {
                    let valuesObj = {...values};
                    valuesObj[field.name] = field.type === "boolean" ? event.target.checked : event.target.value;
                    setValues(valuesObj);
                  }} />
                </p>
              );
            }
          })}
          <br />
          <div className="ButtonRow">
            <button className="SubmitButton" onClick={(e) => isNew ? createHandler(e) : updateHandler(e)}>{isNew ? `Add ${typeName}` : `Save changes`}</button>
            {!isNew && <button className="SubmitButton" onClick={(e) => removeHandler(e)}>{`Remove`}</button>}
          </div>
        </form>
      }
    </div>
  );
};

export default ItemPage;