import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useQuery } from '~/lib/index.ts';

const Index = () => {
  const [items, setItems] = useState<undefined | {_id: string}[]>(undefined);
  const [error, setError] = useState<boolean>(false);

  const { pathname } = useRouter();
  
  const response = useQuery("{getAllUser{_id}}");

  useEffect(() => {
    if (!items && !response) setError(true);
    if (!items && response) setItems(response.getAllUser);
  }, [response, items]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">This is the User Page</h1>
      {error ?
        <p>{`Error fetching the items`}</p>
      : items &&
        <div className="Items">
          {items.map(item => <div className="Item" key={item._id}><a href={`${pathname}/${item._id}`}>{item._id}</a></div>)}
          <div className="Item"><a href={`${pathname}/new`}>{"+"}</a></div>
        </div>
      }
    </div>
  );
};

export default Index;
