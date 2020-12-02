import React from "react";
import "./button.styles.scss";

type Props = {
  value: string;
  className?: string;
  props?: string[];
};

const Button: React.FC<Props> = ({ className, value, ...props }) => {
  return (
    <button className={`appButton ${className}`} {...props}>
      {value}
    </button>
  );
};

export default Button;
