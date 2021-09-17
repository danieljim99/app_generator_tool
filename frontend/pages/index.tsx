import React from 'react';
import { useDeno, useRouter } from 'framework/react';
import { getTypes } from '~/lib/index.ts';

const Home = () => {
  const { pathname } = useRouter();
  const yamlTypes = useDeno(async () => await getTypes());

  return (
    <div className="IndexPage">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>App Generator Tool</h1>
      <h1 className="Title">This is the Home Page</h1>
      {yamlTypes &&
        <div className="Items">
          {yamlTypes.map((type: string, index: number) =>
            <div className="Item" key={index}><a href={`${pathname}${type}`}>{type}</a></div>
          )}
        </div>
      }
    </div>
  );
};

export default Home;
