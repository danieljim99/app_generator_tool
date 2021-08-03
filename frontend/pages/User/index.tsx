import React from 'react';
import { useRouter } from 'framework/react';
import getEnv from '~/lib/getEnv.ts';

const Index = () => {
  const { pathname } = useRouter();
  const apiEndpoint = getEnv("API_URL");

  const users = [
    {_id: "1", name: "User 1"},
    {_id: "2", name: "User 2"},
    {_id: "3", name: "User 3"},
    {_id: "4", name: "User 4"}
  ];

  try {
    fetch(apiEndpoint, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({"query": "{getAllUser{_id,name}}"})
    })
    .then(result => console.log(result))
    .catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>This is the User Page</h1>
      <ul>
        {users.map(user => <li key={user._id}><a href={`${pathname}/${user._id}`}>{user.name}</a></li>)}
      </ul>
    </div>
  );
};

export default Index;
