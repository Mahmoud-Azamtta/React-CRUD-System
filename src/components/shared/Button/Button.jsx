import React from "react";
import "./Button.css";

function Button({ label, buttonClass, clickHandler }) {
  const classes = `${buttonClass} border-none bg-transparent border rounded-1 px-2 py-1`
  return (
    <button className={classes} onClick={clickHandler}>
      {label}
    </button>
  );
}

export default Button;