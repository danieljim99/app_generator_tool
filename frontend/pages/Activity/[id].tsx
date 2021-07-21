import React from 'react';
import { useRouter } from 'framework/react';

const Activity = () => {
  const { params } = useRouter();

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>{`This is the info of activity with id:${params.id} page`}</h1>
    </div>
  );
};

export default Activity;
