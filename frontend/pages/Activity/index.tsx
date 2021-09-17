import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useQuery } from '@apollo/client';
import { GET_ALL_ACTIVITY } from '~/api/queries.ts';

const Index = () => {
  const [items, setItems] = useState<undefined | {_id: string}[]>(undefined);
  const [queryError, setQueryError] = useState<boolean>(false);

  const { pathname } = useRouter();

  const { data, loading, error } = useQuery(GET_ALL_ACTIVITY);

  if (loading) return <div>Loading...</div>;
  if (error) setQueryError(true);

  !loading && !error && setItems(data.getAllActivity);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">This is the Activity Page</h1>
      {queryError ?
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
