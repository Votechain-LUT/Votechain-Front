import React, { useState } from "react";
import { useHistory } from "react-router";
import "./login.styles.scss";
import LoginForm from "../../components/loginForm/loginForm.component";
import { toast } from "react-toastify";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const onChange = (key: string, value: string) => {
    key === "username" ? setUsername(value) : setPassword(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    if (username.length < 3) {
      toast.error("Nazwa użytkownika musi zawierać przynajmniej 3 znaki");
      return;
    }

    if (password.length < 5) {
      toast.error("Hasło musi zawierać przynajmniej 5 znaków");
      return;
    }
    if (username === "admin" && password === "admin") {
      history.push("/admin/onGoingPolls");
    } else {
      toast.error("Nieprawidłowa nazwa użytkownika i/lub hasło.");
    }
  };

  return (
    <section className={"loginPage"}>
      <div className={"wrapper"}>
        <div className={"formContainer"}>
          <LoginForm
            username={username}
            password={password}
            onChange={onChange}
            onSubmit={onSubmit}
          />
        </div>
        <div className={"loginInfo"}>
          <span className={"headerTitle"}>System Votechain:</span>
          <ul>
            <li>organizacja głosowań</li>
            <li>
              pełne bezpieczeństwo i wiarygodność przeprowadzanych głosowań
            </li>
            <li>możliwość śledzenia na bieżąco przebiegu głosowań</li>
            <li>możliwość weryfikacji głosu przez głosującego</li>
            <li>bezpieczny system oparty o technologie blockchain</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
