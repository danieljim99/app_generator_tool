import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useMutation, useQuery } from '~/lib/index.ts';

interface User {
  _id: string;
  name: string;
  age: number;
}

const User = () => {
  const [data, setData] = useState<undefined | User>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<number>(0);

  const { params } = useRouter();

  const isNew = params.id === "new";

  const response = !isNew && useQuery(`{getUser(_id:"${params.id}"){_id,name,age}}`);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    useMutation(`{updateUser(_id:"${params.id}",UserInput:{name:"${name}",age:"${age}"}){_id}}`);
  };

  useEffect(() => {
    if (!data && !response && !isNew) setError(true);
    if (!data && response) {
      setData(response.getUser);
      setName(response.getUser.name);
      setAge(response.getUser.age);      
    } else if (!data && isNew) {
      setData({
        _id: "",
        name: "",
        age: 0
      });
    }
  }, [response, data]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">{isNew ? `This is the new User page` : `This is the Update User page`}</h1>
      {error ?
        <p>{`Error fetching the data`}</p>
      : data &&
        <form className="Form" onSubmit={onSubmit}>
          {!isNew && <p className="FormP">
            <div>{`_id: `}</div>
            <input type="text" readOnly={true} value={data._id} />
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
            {!isNew && <button className="SubmitButton">{`Remove`}</button>}
          </div>
        </form>
      }
    </div>
  );
};

export default User;
