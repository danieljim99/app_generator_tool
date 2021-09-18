import React, { useEffect, useState } from 'react';
import { useRouter } from 'aleph/react';

interface Activity {
  _id: string;
  name: string;
}

const ItemPage = (props: { apiUrl: string }) => {
  const [itemData, setItemData] = useState<undefined | Activity>(undefined);
  const [obj, setObj] = useState<any>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const { params } = useRouter();

  const typeName = params.typeName;

  const isNew = params.id === "new";

  const createHandler = (event: any) => {
    event.preventDefault();
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `mutation{create${typeName}(${typeName}Input: {name: "${name}"}){_id}}`})
      }
    ).then(() => alert("Success"))
    .catch(() => setError(true));
  };

  const updateHandler = (event: any) => {
    event.preventDefault();
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `mutation{update${typeName}(_id: "${params.id}", ${typeName}Input: {name: "${name}"}){_id}}`})
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
        body: JSON.stringify({"query": `mutation{remove${typeName}(_id: "${params.id}"){_id}}`})
      }
    ).then(() => alert("Success"))
    .catch((e) => setError(true));
  };

  useEffect(() => {
    if (obj) setItemData(obj.data?.[`get${typeName}`]);
  }, [obj]);

  useEffect(() => {
    if (isNew) {
      setItemData({
        _id: "",
        name: ""
      });
    } else {
      fetch(
        props.apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: JSON.stringify({"query": `{get${typeName}(_id: "${params.id}"){_id name}}`})
        }
      ).then((response: any) => response.json().then((object: any) => setObj(object)))
      .catch(() => setError(true));
    }
  }, [isNew]);

  useEffect(() => {
    if (itemData) setName(itemData.name);
  }, [itemData]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">{isNew ? `This is the new ${typeName} page` : `This is the Update ${typeName} page`}</h1>
      {error ?
        <p>{`Error fetching the data`}</p>
      : itemData &&
        <form className="Form">
          {!isNew && <p className="FormP">
            <div>{`_id: `}</div>
            <input type="text" readOnly={true} value={itemData._id} />
          </p>}
          <p className="FormP">
            <div>{`name: `}</div>
            <input type="text" value={name} onChange={(event: any) => setName(event.target.value)} />
          </p>
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