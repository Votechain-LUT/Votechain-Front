import React, { useEffect } from "react";
import { Redirect, Route, RouteProps } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/root.reducer";
import Http from "../../services/http.service";

const AdminRoute: React.FC<RouteProps> = (props) => {
  const token = useSelector((state: RootState) => state.user.accessToken);
  const isAdmin = useSelector((state: RootState) => state.user.isAdmin);

  useEffect(() => {
    const http = new Http();
    const refreshToken = async () => {
      await http.refreshToken();
    };
    refreshToken();
  }, []);

  return token && isAdmin ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
      }}
    />
  );
};

export default AdminRoute;
