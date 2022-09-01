import React from "react";
import { IButtonProps } from "./Button.types";
import "./Button.scss";

const Button = ({ children, buttonType, handleClick }: IButtonProps) => {
  return (
    <button className={buttonType} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
