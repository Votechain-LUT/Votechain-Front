import React, { useState } from "react";
import "./login.styles.scss";
import LoginForm from "../../components/loginForm/loginForm.component";
import { validateEmail } from "../../services/login.service";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (key: string, value: string) => {
    key === "email" ? setEmail(value) : setPassword(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    setPassword("");
    if (!validateEmail(email)) {
      toast.error("Nieprawidłowy adres email.");
      return;
    }
    if (password.length < 5) {
      toast.error("Hasło musi zawierać przynajmniej 5 znaków");
      return;
    }
  };

  return (
    <section className={"loginPage"}>
      <div className={"wrapper"}>
        <div className={"formContainer"}>
          <LoginForm
            email={email}
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
