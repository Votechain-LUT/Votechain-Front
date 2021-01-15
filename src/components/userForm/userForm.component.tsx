import React, { useState } from "react";
import "./userForm.styles.scss";
import FormInput from "../formInput/formInput.component";
import Button from "../button/button.component";
import { toast } from "react-toastify";
import { validateEmail } from "../../helpers";
import Http from "../../services/http.service";

const UserForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.length < 3) {
      toast.error("Nazwa użytkownika musi zawierać przynajmniej 3 znaki");
      return;
    }
    if (password.length < 3) {
      toast.error("Hasło musi zawierać przynajmniej 3 znaki");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Nieprawidłowy format adresu email");
      return;
    }
    const requestBody = {
      username,
      email,
      password,
    };
    const http = new Http();
    try {
      await http.createUser(requestBody);
    } catch (err) {
      toast.error("Coś poszło nie tak :( " + err.response.data.detail);
    }
    // dodać history.push("/admin/users")
  };

  return (
    <form className={"userForm"} onSubmit={onSubmit}>
      <FormInput
        type={"text"}
        value={username}
        label={"Nazwa użytkownika"}
        placeholder={"Nazwa użytkownika"}
        onChange={(e) => setUsername(e.target.value)}
      />
      <FormInput
        type={"password"}
        value={password}
        label={"Hasło"}
        placeholder={"Hasło"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <FormInput
        type={"text"}
        value={email}
        label={"Adres email"}
        placeholder={"Adres email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Button className={"mt20"} value={"Dodaj użytkownika"} />
    </form>
  );
};

export default UserForm;
