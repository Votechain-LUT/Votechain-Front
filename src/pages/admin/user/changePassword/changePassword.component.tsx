import React, { useState } from "react";
import "./changePassword.styles.scss";
import FormInput from "../../../../components/formInput/formInput.component";
import Button from "../../../../components/button/button.component";
import { toast } from "react-toastify";
import Http from "../../../../services/http.service";
import { useHistory } from "react-router";

const ChangePasswordPage: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const history = useHistory();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 8 || confirmPassword.length < 8) {
      toast.error("Hasło musi zawierać przynajmniej 8 znaków");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Hasła muszą być identyczne!");
      return;
    }
    const http = new Http();
    try {
      await http.changePassword({
        password: newPassword,
        old_password: oldPassword,
        confirm_password: newPassword,
      });
      history.push("/polls");
      toast.success("Hasło zostało zmienione pomyślnie");
    } catch (err) {
      const obj = err.response.data;
      Object.values(obj).map((error) =>
        toast.error("Coś poszło nie tak :( " + error)
      );
    }
  };

  return (
    <section className={"changePasswordPage"}>
      <form onSubmit={onSubmit}>
        <FormInput
          type={"password"}
          value={oldPassword}
          label={"Stare hasło"}
          placeholder={"Stare hasło"}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <FormInput
          type={"password"}
          value={newPassword}
          label={"Nowe hasło"}
          placeholder={"Nowe hasło"}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <FormInput
          type={"password"}
          value={confirmPassword}
          label={"Potwierdź hasło"}
          placeholder={"Potwierdź hasło"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button className={"mt20"} value={"Zapisz"} />
      </form>
    </section>
  );
};

export default ChangePasswordPage;
