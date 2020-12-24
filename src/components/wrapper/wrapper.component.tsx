import React from "react";
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
registerLocale("pl", pl);

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
              path={"/admin/endedPolls"}
              component={AdminDashboard}
            />
            <PrivateRoute
              path={"/admin/createdPolls"}
              component={AdminDashboard}
            />
            <PrivateRoute path={"/admin/newPoll"} component={NewPollPage} />
            <PrivateRoute
              path={"/admin/editPoll/:id"}
              component={EditPollPage}
            />
            <PrivateRoute
              path={"/admin/newCandidate"}
              component={NewCandidatePage}
            />
            <PrivateRoute path={"/admin/poll/:pollId"} component={PollPage} />
            <Route path={"*"} component={NotFoundPage} />
          </Switch>
        </Router>
        <ToastContainer />
        <div id={"overlay"} />
      </Provider>
    </div>
  );
};
