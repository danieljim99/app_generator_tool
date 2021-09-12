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

  const isNew = params.id === "new";

  const response = !isNew && useQuery(`{getActivity(_id:"${params.id}"){_id,name}}`);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    useMutation(`{updateActivity(_id:"${params.id}",ActivityInput:{name:"${name}"){_id}}`);
    event.preventDefault();
  };

  useEffect(() => {
    if (!data && !response && !isNew) setError(true);
    if (!data && response) {
      setData(response.getActivity);
      setName(response.getActivity.name);
    } else if (!data && isNew) {
      setData({
        _id: "",
        name: ""
      });
    }
  }, [response, data]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">{isNew ? `This is the new Activity page` : `This is the Update Activity page`}</h1>
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
          <br />
          <div className="ButtonRow">
            <button className="SubmitButton" type="submit">{isNew ? `Add Activity` : `Save changes`}</button>
            {!isNew && <button className="SubmitButton">{`Remove`}</button>}
          </div>
        </form>
      }
    </div>
  );
};

export default Activity;
