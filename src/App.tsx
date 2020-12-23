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
  const [sidebarField, setSidebarField] = useState("");
  const { showSidebar, token } = useSelector((state: RootState) => {
    return {
      showSidebar: state.app.showSidebar,
      token: state.user.token,
    };
  });

  useEffect(() => {
    const sidebarField = location.pathname.split("/")[2];
    setSidebarField(sidebarField);
  }, [location]);

  return (
    <div className={"appWrapper"}>
      <div className={"topSection"}>
        <img
          onClick={() => dispatch(toggleSidebar())}
          className={"sidebarIcon"}
          role={"presentation"}
          src={menuLogo}
          alt={"menuLogo"}
        />
        {token && (
          <span
            role={"presentation"}
            onClick={() => dispatch(logout())}
            className={"logout"}
          >
            Wyloguj się
          </span>
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
