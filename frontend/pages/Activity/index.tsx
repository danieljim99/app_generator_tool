import React from 'react';
import { useRouter } from 'framework/react';

const Index = () => {
  const { pathname } = useRouter();

  const activities = [
    {_id: "1", name: "Activity 1"},
    {_id: "2", name: "Activity 2"},
    {_id: "3", name: "Activity 3"},
    {_id: "4", name: "Activity 4"}
  ];

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>This is the Activity Page</h1>
      <ul>
        {activities.map(activity =>
          <li key={activity._id}><a href={`${pathname}/${activity._id}`}>{`${activity.name}`}</a></li>
        )}
      </ul>
    </div>
  );
};

export default Index;
