import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import appLogo from "./assets/appLogo.png";
import menuLogo from "./assets/menu.png";
import "./App.styles.scss";
import "react-toastify/dist/ReactToastify.css";
import { AppDispatcher } from "./redux/app/app.dispatcher";
import { SidebarMobile } from "./components/sidebar/sidebarMobile.component";
import { useLocation } from "react-router";

type AppProps = {
  app: {
    showSidebar: boolean;
  };
};

const App: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatcher = new AppDispatcher(dispatch);
  const location = useLocation();
  const [sidebarField, setSidebarField] = useState("");
  const { showSidebar } = useSelector((state: AppProps) => {
    return {
      showSidebar: state.app.showSidebar,
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
          onClick={() => appDispatcher.toggleSidebar()}
          className={"sidebarIcon"}
          role={"presentation"}
          src={menuLogo}
          alt={"menuLogo"}
        />
        <span className={"logout"}>Wyloguj się</span>
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
