import React from "react";

const Select = props => {
  const { label, name, error, options, ...rest } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        autoFocus
        {...rest}
        name={name}
        id={name}
        className="form-control"
      >
        <option value=""></option>
        {options.map(option => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
