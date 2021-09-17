import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_USER, UPDATE_USER, REMOVE_USER } from '~/api/queries.ts';

interface User {
  _id: string;
  name: string;
  age: number;
}

const User = () => {
  const [itemData, setItemData] = useState<undefined | User>(undefined);
  const [queryError, setQueryError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const [updateUser] = useMutation(UPDATE_USER);
  const [removeUser] = useMutation(REMOVE_USER);

  const { params } = useRouter();

  const isNew = params.id === "new";

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateUser({
      variables: {
        _id: params.id,
        UserInput: {
          name: name,
          age: age
        }
      }
    })
    .catch(() => setQueryError(true));
  };

  const onRemove = () => {
    removeUser({
      variables: { _id: params.id }
    })
    .then(() => useRouter().push(`/User`))
    .catch(() => setQueryError(true));
  };

  const { data, loading, error } = useQuery(
    GET_USER,
    {
      variables: { _id: params.id },
      skip: isNew
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) setQueryError(error);

  !loading && !error && !isNew && setItemData(data.GetUser);

  useEffect(() => {
    if (isNew) {
      setItemData({
        _id: "",
        name: "",
        age: 0
      });
    }
  }, [isNew]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">{isNew ? `This is the new User page` : `This is the Update User page`}</h1>
      {queryError ?
        <p>{`Error fetching the data`}</p>
      : itemData &&
        <form className="Form" onSubmit={onSubmit}>
          {!isNew && <p className="FormP">
            <div>{`_id: `}</div>
            <input type="text" readOnly={true} value={itemData._id} />
          </p>}
          <p className="FormP">
            <div>{`name: `}</div>
            <input type="text" value={name} onChange={(event: any) => setName(event.target.value)} />
          </p>
          <p className="FormP">
            <div>{`age: `}</div>
            <input type="number" value={age} onChange={(event: any) => setAge(event.target.value)} />
          </p>
          <br />
          <div className="ButtonRow">
            <button className="SubmitButton" type="submit">{isNew ? `Add User` : `Save changes`}</button>
            {!isNew && <button className="SubmitButton" onClick={() => onRemove()}>{`Remove`}</button>}
          </div>
        </form>
      }
    </div>
  );
};

export default User;
