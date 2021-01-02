import React from "react";
import { Link } from "react-router-dom";
import "./sidebar.styles.scss";

type Props = {
  sidebarField: string;
};

export const Sidebar: React.FC<Props> = ({ sidebarField }) => {
  return (
    <section className={"sidebar"}>
      <div className={"sidebarWrapper"}>
        <div className={"sidebarHeader"}>
          <h1>Głosowania</h1>
        </div>
        <div>
          <ul>
            <li className={sidebarField === "newPoll" ? "active" : ""}>
              <Link to={"/admin/newPoll"}>Dodaj nowe głosowanie</Link>
            </li>
            <li className={sidebarField === "onGoingPolls" ? "active" : ""}>
              <Link to={"/admin/onGoingPolls"}>Trwajace głosowania</Link>
            </li>
            <li className={sidebarField === "futurePolls" ? "active" : ""}>
              <Link to={"/admin/futurePolls"}>Nadchodzące głosowania</Link>
            </li>
            <li className={sidebarField === "canceledPolls" ? "active" : ""}>
              <Link to={"/admin/canceledPolls"}>Anulowane głosowania</Link>
            </li>
            <li className={sidebarField === "endedPolls" ? "active" : ""}>
              <Link to={"/admin/endedPolls"}>Zakończone głosowania</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className={"sidebarWrapper"}>
        <div className={"sidebarHeader"}>
          <h1>Kandydaci</h1>
        </div>
        <div>
          <ul>
            <li className={sidebarField === "newCandidate" ? "active" : ""}>
              <Link to={"/admin/newCandidate"}>Dodaj kandydata</Link>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
