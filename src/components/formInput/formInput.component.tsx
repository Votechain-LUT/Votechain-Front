import React from "react";

type Props = {
  type: string;
  value: string;
  label: string;
  placeholder: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
  props?: string[];
};

const FormInput = ({ type, value, label, onChange, ...props }: Props) => {
  return (
    <div className={"formInput"}>
      {label && <label>{label}</label>}
      <input type={type} value={value} onChange={onChange} {...props} />
    </div>
  );
};

export default FormInput;
