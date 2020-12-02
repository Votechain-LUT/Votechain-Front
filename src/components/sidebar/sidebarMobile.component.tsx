import React from "react";
import cancelIcon from "../../assets/cancel.png";
import { useDispatch } from "react-redux";
import { AppDispatcher } from "../../redux/app/app.dispatcher";

export const SidebarMobile: React.FC = () => {
  const dispatch = useDispatch();
  const appDispatcher = new AppDispatcher(dispatch);
  return (
    <section className={"sidebarMobile"}>
      <div>
        <div className={"header"}>
          <h1>Głosowania</h1>
          <img
            src={cancelIcon}
            alt={"cancelIcon"}
            role={"presentation"}
            onClick={() => appDispatcher.toggleSidebar()}
          />
        </div>
        <div>
          <ul>
            <li>Dodaj nowe głosowanie</li>
            <li>Trwające głosowania</li>
            <li>Nadchodzące głosowania</li>
            <li>Zakończone głosowania</li>
          </ul>
        </div>
      </div>
    </section>
  );
};
