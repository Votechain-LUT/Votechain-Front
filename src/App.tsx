import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import menuLogo from "./assets/menu.png";
import "./App.styles.scss";
import "react-toastify/dist/ReactToastify.css";
import { SidebarMobile } from "./components/sidebar/sidebarMobile.component";
import { useLocation } from "react-router";
import { RootState } from "./redux/root.reducer";
import { toggleSidebar } from "./redux/app.slice";
import { logout } from "./redux/user.slice";
import appLogo from "./assets/appLogo.png";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const [sidebarField, setSidebarField] = useState("");
  const isAdminRoute = location.pathname.includes("admin");
  const isLoginRoute = location.pathname === "/";
  const { showSidebar, token } = useSelector((state: RootState) => {
    return {
      showSidebar: state.app.showSidebar,
      token: state.user.accessToken,
    };
  });

  useEffect(() => {
    const sidebarField = location.pathname.split("/")[2];
    setSidebarField(sidebarField);
  }, [location]);
  return (
    <div className={"appWrapper"}>
      <div className={"topSection"}>
        {!isLoginRoute && (
          <img
            onClick={() => dispatch(toggleSidebar())}
            className={"sidebarIcon"}
            role={"presentation"}
            src={menuLogo}
            alt={"menuLogo"}
          />
        )}
        {token && (
          <div>
            {!isAdminRoute && (
              <span
                className={"pointer"}
                role={"presentation"}
                onClick={() => history.push("/changePassword")}
              >
                Zmień hasło
              </span>
            )}
            <span
              role={"presentation"}
              onClick={() => dispatch(logout())}
              className={"logout"}
            >
              Wyloguj się
            </span>
          </div>
        )}
      </div>
      <div className={"logoContainer"}>
        <Link to={"/"}>
          <img src={appLogo} alt={"appLogo"} />
        </Link>
      </div>
      {showSidebar && <SidebarMobile sidebarField={sidebarField} />}
    </div>
  );
};

export default App;
