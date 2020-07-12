import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  console.log("select: ", name, label, options, error, rest);
  return (
    <React.Fragment>
      <div className="form-group">
        <label htmlFor={name}>{label}</label>
        <select {...rest} id={name} name={name} className="form-control">
          <option value="" />
          {options.map((option) => (
            <option key={option._id} value={option._id}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
    </React.Fragment>
  );
};

export default Select;

//{this.renderOptions(options)}

//
//{options.map((option) => (
//  <option key={option._id} value={option._id}>
//    {option.name}
//  </option>
//))}
