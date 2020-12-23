import React from "react";
import "./button.styles.scss";

type Props = {
  value: string;
  className?: string;
  handleClick?: () => void;
};

const Button: React.FC<Props> = ({ className, value, handleClick }) => {
  return (
    <button
      onClick={() => (handleClick ? handleClick() : null)}
      className={`appButton ${className}`}
    >
      {value}
    </button>
  );
};

export default Button;
