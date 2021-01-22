import React from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";

const PrivateRoute: React.FC<RouteProps> = (props) => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  return token ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  );
};

export default PrivateRoute;
