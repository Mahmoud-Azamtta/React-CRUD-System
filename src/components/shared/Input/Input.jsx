import React, { useState } from "react";
import "./Input.css";

function Input(props) {
  const { id, title, onChange, errorMessage, ...inputProps } = props;
  const inputClasses = `form-control bg-black text-white ${errorMessage ? 'invalid' : ''}`;
  return (
    <div className="input-wrapper mb-2">
      <label htmlFor={id} className="form-label">
        {title}
      </label>
      <input
        className={inputClasses}
        {...inputProps}
        onChange={onChange}
      />
      {errorMessage && <p className="error-message my-1">{errorMessage}</p>}
    </div>
  );
}

export default Input;