import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <input {...rest} id={name} name={name} className="form-control" />
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Input;
