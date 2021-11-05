import React from 'react';

export const ErrorModal = (props: { message: string }) => {
  return (
    <div className="ErrorModal">
      <div className="ErrorTitle">
        YAML ERROR
      </div>
      <div className="ErrorMessage">
        {props.message}
      </div>
    </div>
  );
};
