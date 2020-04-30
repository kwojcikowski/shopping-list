import React from "react";
import PropTypes from "prop-types";

const InlineSelectInput = ({
  name,
  onChange,
  defaultOption,
  value,
  error,
  options,
}) => {
  return (
    <div>
      <select name={name} value={value} onChange={onChange}>
        <option value={value}>{defaultOption}</option>
        {options.map((option) => {
          return (
            <option key={option} value={option}>
              {option}
            </option>
          );
        })}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

InlineSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  defaultOption: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
};

export default InlineSelectInput;
