import React, { useEffect, useState } from 'react';
import { useRouter } from 'framework/react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_ACTIVITY, UPDATE_ACTIVITY, REMOVE_ACTIVITY } from '~/api/queries.ts';

interface Activity {
  _id: string;
  name: string;
}

const Activity = () => {
  const [itemData, setItemData] = useState<undefined | Activity>(undefined);
  const [queryError, setQueryError] = useState<boolean>(false);

  const [name, setName] = useState<string>("");

  const [updateActivity] = useMutation(UPDATE_ACTIVITY);
  const [removeActivity] = useMutation(REMOVE_ACTIVITY);

  const { params } = useRouter();

  const isNew = params.id === "new";

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    updateActivity({
      variables: {
        _id: params.id,
        ActivityInput: { name: name }
      }
    })
    .catch(() => setQueryError(true));
  };

  const onRemove = () => {
    removeActivity({
      variables: { _id: params.id }
    })
    .then(() => useRouter().push(`/Activity`))
    .catch(() => setQueryError(true));
  }

  const { data, loading, error } = useQuery(
    GET_ACTIVITY,
    {
      variables: { _id: params.id },
      skip: isNew
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) setQueryError(true);

  !loading && !error && !isNew && setItemData(data.GetActivity);

  useEffect(() => {
    if (isNew) {
      setItemData({
        _id: "",
        name: ""
      });
    }
  }, [isNew]);

  return (
    <div className="page">
      <head>
        <title>App Generator Tool</title>
        <link rel="stylesheet" href="../../style/index.css" />
      </head>
      <h1 className="Title">{isNew ? `This is the new Activity page` : `This is the Update Activity page`}</h1>
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
          <br />
          <div className="ButtonRow">
            <button className="SubmitButton" type="submit">{isNew ? `Add Activity` : `Save changes`}</button>
            {!isNew && <button className="SubmitButton" onClick={() => onRemove()}>{`Remove`}</button>}
          </div>
        </form>
      }
    </div>
  );
};

export default Activity;
