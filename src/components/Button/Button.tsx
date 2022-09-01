import React from "react";
import { IButtonProps } from "components/Button/interfaces";
import "components/Button/Button.scss";

const Button = ({ children, buttonType, handleClick }: IButtonProps) => {
  return (
    <button className={buttonType} onClick={handleClick}>
      {children}
    </button>
  );
};

export default Button;
