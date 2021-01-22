import React, { useEffect, useState } from "react";
import "./login.styles.scss";
import LoginForm from "../../components/loginForm/loginForm.component";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";
import { useHistory } from "react-router";
import { fetchToken } from "../../redux/user.slice";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);
  const token = useSelector((state: RootState) => state.user.accessToken);
  const history = useHistory();

  useEffect(() => {
    if (isAdmin && token) {
      history.push("/admin/onGoingPolls");
    } else if (!isAdmin && token) {
      history.push("/polls");
    }
  }, [isAdmin, token]);

  const onChange = (key: string, value: string) => {
    key === "username" ? setUsername(value) : setPassword(value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUsername("");
    setPassword("");
    if (username.length < 3 || username.length > 15) {
      toast.error("Nazwa użytkownika musi zawierać od 3 do 15 znaków");
      return;
    }

    if (password.length < 3 || password.length > 15) {
      toast.error("Hasło musi zawierać od 3 do 15 znaków");
      return;
    }
    const requestBody = {
      username: username,
      password: password,
    };
    dispatch(fetchToken(requestBody));
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
