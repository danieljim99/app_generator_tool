import React from 'react';
import { useRouter } from 'framework/react';
import { gql, useQuery } from '@apollo/client';

const GET_ALL_USER = gql`
  query getAllUser {
    _id
    name
    email
  }
`;

const Index = () => {
  const { pathname } = useRouter();

  const users = [
    {_id: "1", name: "User 1"},
    {_id: "2", name: "User 2"},
    {_id: "3", name: "User 3"},
    {_id: "4", name: "User 4"}
  ];

  const {data, loading, error} = useQuery(GET_ALL_USER);

  if (loading) return (<div className="page">Loading...</div>);
  if (error) return (<div className="page">{`Error! ${error.message}`}</div>);

  console.log(data);

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
