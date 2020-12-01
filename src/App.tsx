import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import LoginPage from "./pages/login/login.component";
import appLogo from "./assets/appLogo.png";
import { ToastContainer } from "react-toastify";
import "./App.styles.scss";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div>
      <Router>
        <div className={"logoContainer"}>
          <Link to={"/"}>
            <img src={appLogo} alt={"appLogo"} />
          </Link>
        </div>
        <Switch>
          <Route exact path={"/"} component={LoginPage} />
        </Switch>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
