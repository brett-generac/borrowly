import React from "react";

const ErrorMessage = (props) => {
  return (
    <div className={`${props.classToAdd} alert alert-danger alert-dismissible fade show`} role="alert">
      {props.message}
      <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={props.handleClearError}>
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
};

export default ErrorMessage;
