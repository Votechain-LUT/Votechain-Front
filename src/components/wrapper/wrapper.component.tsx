import React from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/login/login.component";
import AdminDashboard from "../../pages/admin/dashboard/dashboard.component";
import { ToastContainer } from "react-toastify";
import App from "../../App";
import NotFoundPage from "../../pages/notFound/notFound.component";
import PrivateRoute from "../privateRoute/privateRoute.component";

export const Wrapper: React.FC = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <App />
          <Switch>
            <Route exact path={"/"} component={LoginPage} />
            <PrivateRoute
              path={"/admin/onGoingPolls"}
              component={AdminDashboard}
            />
            <PrivateRoute
              path={"/admin/futurePolls"}
              component={AdminDashboard}
            />
            <PrivateRoute
              path={"/admin/futurePolls"}
              component={AdminDashboard}
            />
            <PrivateRoute
              path={"/admin/endedPolls"}
              component={AdminDashboard}
            />
            <PrivateRoute
              path={"/admin/createdPolls"}
              component={AdminDashboard}
            />
            <PrivateRoute path={"/admin/newPoll"} component={AdminDashboard} />
            <PrivateRoute
              path={"/admin/newCandidate"}
              component={AdminDashboard}
            />
            <Route path={"*"} component={NotFoundPage} />
          </Switch>
        </Router>
        <ToastContainer />
      </Provider>
    </div>
  );
};
