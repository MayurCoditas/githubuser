import React from "react";

interface ButtonPropType {
  children: React.ReactNode;
  buttonType: string;
  handleClick: Function;
}

const Button = ({ children, buttonType, handleClick }: ButtonPropType) => {
  return (
    <button className={buttonType} onClick={(e) => handleClick(e)}>
      {children}
    </button>
  );
};

export default Button;
