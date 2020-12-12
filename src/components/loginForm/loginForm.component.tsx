import React from "react";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";

type Props = {
  username: string;
  password: string;
  onChange(key: string, value: string): void;
  onSubmit(e: React.FormEvent): void;
};

const LoginForm: React.FC<Props> = ({
  username,
  password,
  onChange,
  onSubmit,
}) => {
  return (
    <form onSubmit={(e) => onSubmit(e)}>
      <FormInput
        value={username}
        placeholder={"Nazwa użytkownika"}
        onChange={(e) => onChange("username", e.target.value)}
        label={"Nazwa użytkownika"}
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
