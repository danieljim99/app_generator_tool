import React, { useState } from 'react';
import { useDeno } from 'framework/react';
import Logo from '~/components/logo.tsx';
import getTypes from '~/lib/getTypes.ts';

const Home = () => {
  const [types, setTypes] = useState<string[] | undefined>(undefined);

  !types && setTypes(useDeno(async () => await getTypes()));

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <p className="logo"><Logo /></p>
      <h1>App Generator Tool</h1>
      <h2>This is the Home Page</h2>
      {types &&
        <ul>
          {types.map((type, index) =>
            <li key={index}><a href={`http://localhost:8080/${type}`}>{type}</a></li>
          )}
        </ul>
      }
    </div>
  );
};

export default Home;