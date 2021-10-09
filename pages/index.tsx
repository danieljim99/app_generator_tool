import React from 'react';
import { useRouter } from 'aleph/react';

const Home = (props: { yamlTypes: any[] }) => {
  const { pathname } = useRouter();

  return (
    <div className="IndexPage">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../style/index.css" />
      </head>
      <h1>App Generator Tool</h1>
      <h1 className="Title">This is the Home Page</h1>
      {props.yamlTypes &&
        <div className="Items">
          {props.yamlTypes.map((type: any, index: number) =>
            <div className="Item" key={index}><a href={`${pathname}${type.name}`}>{type.name}</a></div>
          )}
        </div>
      }
    </div>
  );
};

export default Home;
