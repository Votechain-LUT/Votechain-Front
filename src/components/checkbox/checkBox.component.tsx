import React from "react";
import "./checkBox.styles.scss";

type Props = {
  label: string;
  isChecked: boolean;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  className?: string;
};

const CheckBox: React.FC<Props> = ({
  label,
  isChecked,
  onChange,
  className,
}) => {
  return (
    <label className={`checkBoxWrapper ${className ? className : ""}`}>
      <span className={"label"}>{label}</span>
      <input type={"checkbox"} checked={isChecked} onChange={onChange} />
      <span className={"checkmark"} />
    </label>
  );
};

export default CheckBox;
