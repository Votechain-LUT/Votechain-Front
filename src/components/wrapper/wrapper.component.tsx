import React, { useEffect } from "react";
import { Provider } from "react-redux";
import store from "../../redux/store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "../../pages/login/login.component";
import NotFoundPage from "../../pages/notFound/notFound.component";
import NewCandidatePage from "../../pages/admin/candidate/new/newCandidate.component";
import NewPollPage from "../../pages/admin/poll/new/newPoll.component";
import EditPollPage from "../../pages/admin/poll/edit/editPoll.component";
import PollPage from "../../pages/admin/poll/show/poll.component";
import AdminDashboard from "../../pages/admin/dashboard/dashboard.component";
import App from "../../App";
import PrivateRoute from "../privateRoute/privateRoute.component";
import { ToastContainer } from "react-toastify";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import pl from "date-fns/locale/pl";
import PollsPage from "../../pages/polls/polls.component";
import NewUserPage from "../../pages/admin/user/new/newUser.component";
import UserListPage from "../../pages/admin/user/index/userList.component";
import ChangePasswordPage from "../../pages/admin/user/changePassword/changePassword.component";
import UserPollPage from "../../pages/polls/poll.component";
import AdminRoute from "../adminRoute/adminRoute.component";
registerLocale("pl", pl);

export const Wrapper: React.FC = () => {
  useEffect(() => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === "logout") {
        window.location.href =
          process.env.REACT_APP_APP_URL || "http://localhost:3000";
      }
    };
    window.addEventListener("storage", syncLogout);
    return () => {
      window.removeEventListener("storage", syncLogout);
    };
  }, []);

  return (
    <div>
      <Provider store={store}>
        <Router>
          <App />
          <Switch>
            <Route exact path={"/"} component={LoginPage} />
            <PrivateRoute exact path={"/polls"} component={PollsPage} />
            <PrivateRoute
              path={"/changePassword"}
              component={ChangePasswordPage}
            />
            <PrivateRoute path={"/polls/:id"} component={UserPollPage} />

            <AdminRoute path={"/admin/newUser"} component={NewUserPage} />
            <AdminRoute path={"/admin/users"} component={UserListPage} />
            <AdminRoute
              path={"/admin/onGoingPolls"}
              component={AdminDashboard}
            />
            <AdminRoute
              path={"/admin/futurePolls"}
              component={AdminDashboard}
            />
            <AdminRoute path={"/admin/endedPolls"} component={AdminDashboard} />
            <AdminRoute
              path={"/admin/canceledPolls"}
              component={AdminDashboard}
            />
            <AdminRoute path={"/admin/newPoll"} component={NewPollPage} />
            <AdminRoute path={"/admin/editPoll/:id"} component={EditPollPage} />
            <AdminRoute
              path={"/admin/newCandidate"}
              component={NewCandidatePage}
            />
            <AdminRoute path={"/admin/poll/:pollId"} component={PollPage} />
            <Route path={"*"} component={NotFoundPage} />
          </Switch>
        </Router>
        <ToastContainer />
        <div id={"overlay"} />
      </Provider>
    </div>
  );
};
