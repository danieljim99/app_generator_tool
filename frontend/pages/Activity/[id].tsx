import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useMutation, useQuery } from '~/lib/index.ts';

interface Activity {
  _id: string;
  name: string;
}

const Activity = () => {
  const [data, setData] = useState<undefined | Activity>(undefined);
  const [error, setError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const { params } = useRouter();

  const response = useQuery(`{getActivity(_id:"${params.id}"){_id,name}}`);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    useMutation(`{updateActivity(_id:"${params.id}",ActivityInput:{name:"${name}"){_id}}`);
    event.preventDefault();
  };

  useEffect(() => {
    if (!data && !response) setError(true);
    if (!data && response) {
      setData(response.getActivity);
      setName(response.getActivity.name);
    }
  }, [response, data]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1>{`This is the info of activity with id:${params.id} page`}</h1>
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
          <br />
          <button type="submit">{`Guardar cambios`}</button>
        </form>
      }
    </div>
  );
};

export default Activity;
