import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useMutation, useQuery } from '~/lib/index.ts';

interface User {
  _id: string;
  name: string;
  email: string;
}

const User = () => {
  const [data, setData] = useState<undefined | User>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { params } = useRouter();

  const response = useQuery(`{getUser(_id:"${params.id}"){_id,name,email}}`);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    useMutation(`{updateUser(_id:"${params.id}",UserInput:{name:"${name}",email:"${email}"}){_id}}`);
    event.preventDefault();
  };

  useEffect(() => {
    if (!data && !response) setError(true);
    if (!data && response) {
      setData(response.getUser);
      setName(response.getUser.name);
      setEmail(response.getUser.email);      
    }
  }, [response, data]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>{`This is the info of user with id:${params.id} page`}</h1>
      {error ?
        <p>{`Error fetching the data`}</p>
      : data &&
        <form onSubmit={onSubmit}>
          <p>
            {`_id: `}
            <input type="text" readOnly={true} value={data._id} />
          </p>
          <p>
            {`name: `}
            <input type="text" value={name} onChange={(event: any) => setName(event.target.value)} />
          </p>
          <p>
            {`email: `}
            <input type="text" value={email} onChange={(event: any) => setEmail(event.target.value)} />
          </p>
          <br />
          <button type="submit">{`Guardar cambios`}</button>
        </form>
      }
    </div>
  );
};

export default User;
