import React, { useState } from "react";
import "./login.styles.scss";
import LoginForm from "../../components/loginForm/loginForm.component";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (key: string, value: string) => {
    key === "email" ? setEmail(value) : setPassword(value);
  };

  return (
    <section className={"loginPage"}>
      <div className={"wrapper"}>
        <div className={"formContainer"}>
          <LoginForm email={email} password={password} onChange={onChange} />
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
