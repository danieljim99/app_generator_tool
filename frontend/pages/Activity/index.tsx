import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import useQuery from '~/lib/useQuery.ts';

interface ActivityType {
  _id: string;
  name: string;
}

const Index = () => {
  const [items, setItems] = useState<undefined | ActivityType[]>(undefined);
  const [error, setError] = useState<boolean>(false);

  const { pathname } = useRouter();
  
  const response = useQuery("{getAllActivity{_id,name}}");

  useEffect(() => {
    if (!items && !response) setError(true);
    if (!items && response) setItems(response.getAllActivity);
  }, [response, items]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>This is the Activity Page</h1>
      {error ?
        <p>{`Error fetching the data`}</p>
      : items &&
        <ul>
          {items.map(item => <li key={item._id}><a href={`${pathname}/${item._id}`}>{item._id}</a></li>)}
        </ul>
      }
    </div>
  );
};

export default Index;
