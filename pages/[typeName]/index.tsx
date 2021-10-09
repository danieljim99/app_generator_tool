import React, { useState, useEffect } from 'react';
import { useRouter } from 'aleph/react';

const Index = (props: { apiUrl: string }) => {
  const [items, setItems] = useState<undefined | {_id: string}[]>(undefined);
  const [obj, setObj] = useState<any>(undefined);
  const [error, setError] = useState<boolean>(false);

  const { pathname, params } = useRouter();

  const typeName = params.typeName;

  useEffect(() => {
    fetch(
      props.apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify({"query": `{getAll${typeName}{_id}}`})
      }
    ).then((response: any) => response.json().then((object: any) => setObj(object)))
    .catch(() => setError(true));
  }, []);

  useEffect(() => {
    if (obj) setItems(obj.data?.[`getAll${typeName}`]);
  }, [obj]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <div>
        {" > "}<a href="/">{`Home`}</a>
      </div>
      <h1 className="Title">{`This is the ${typeName} page`}</h1>
      {error ?
        <p>{`Error fetching the items`}</p>
      : 
        <div className="Items">
          {items && items.map(item => <div className="Item" key={item._id}><a href={`${pathname}/${item._id}`}>{item._id}</a></div>)}
          <div className="Item"><a href={`${pathname}/new`}>{"+"}</a></div>
        </div>
      }
    </div>
  );
};

export default Index;
