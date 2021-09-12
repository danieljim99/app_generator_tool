import React, { useEffect, useState } from 'react';
import { useDeno, useRouter } from 'framework/react';
import { getTypes } from '~/lib/index.ts';

const Home = () => {
  const { pathname } = useRouter();
  const yamlTypes = useDeno(async () => await getTypes());

  const [types, setTypes] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    !types && setTypes(yamlTypes);
  }, [types]);

  return (
    <div className="IndexPage">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>App Generator Tool</h1>
      <h1 className="Title">This is the Home Page</h1>
      {types &&
        <div className="Items">
          {types.map((type, index) =>
            <div className="Item" key={index}><a href={`${pathname}${type}`}>{type}</a></div>
          )}
        </div>
      }
    </div>
  );
};

export default Home;
