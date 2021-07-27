import React, { useEffect, useState } from 'react';
import { useDeno, useRouter } from 'framework/react';
import Logo from '~/components/logo.tsx';
import getTypes from '~/lib/getTypes.ts';

const Home = () => {
  const { pathname } = useRouter();
  const yamlTypes = useDeno(async () => await getTypes());

  const [types, setTypes] = useState<string[] | undefined>(undefined);

  useEffect(() => {
    !types && setTypes(yamlTypes);
  }, [types]);

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
            <li key={index}><a href={`${pathname}${type}`}>{type}</a></li>
          )}
        </ul>
      }
    </div>
  );
};

export default Home;
