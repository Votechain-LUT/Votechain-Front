import React, { useEffect, useState } from "react";
import "./login.styles.scss";
import LoginForm from "../../components/loginForm/loginForm.component";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";
import { useHistory, useLocation } from "react-router";
import { fetchToken } from "../../redux/user.slice";

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const token = useSelector((state: RootState) => state.user.accessToken);
  const history = useHistory();
  const location = useLocation();
  const isAdminRoute = location.pathname === "/admin";

  useEffect(() => {
    if (token) {
      isAdminRoute
        ? history.push("/admin/onGoingPolls")
        : history.push("/polls");
    }
  }, [token, history]);

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
