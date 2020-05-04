import React from "react";
import PropTypes from "prop-types";
import "./InlineTextInput.css";

const InlineTextInput = ({ name, onChange, value, error, onFocusOut }) => {
  let wrapperClass = "inlineTextInput";
  if (error && error.length > 0) {
    wrapperClass += " " + "has-error";
  }

  return (
    <div className={wrapperClass}>
      <input
        className={wrapperClass}
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onFocusOut}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

InlineTextInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.number,
  error: PropTypes.string,
  onFocusOut: PropTypes.func
};

export default InlineTextInput;
