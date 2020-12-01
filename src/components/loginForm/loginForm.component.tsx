import React from "react";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";

type Props = {
  email: string;
  password: string;
  onChange(key: string, value: string): void;
  onSubmit(e: React.FormEvent): void;
};

const LoginForm: React.FC<Props> = ({
  email,
  password,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormInput
        value={email}
        placeholder={"Adres email"}
        onChange={(e) => onChange("email", e.target.value)}
        label={"Adres email"}
        type={"text"}
      />
      <FormInput
        value={password}
        placeholder={"Hasło"}
        onChange={(e) => onChange("password", e.target.value)}
        label={"Hasło"}
        type={"password"}
      />
      <Button value={"Zaloguj się"} />
    </form>
  );
};

export default LoginForm;
