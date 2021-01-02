import React from "react";
import cancelIcon from "../../assets/cancel.png";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toggleSidebar } from "../../redux/app.slice";

type Props = {
  sidebarField: string;
};

export const SidebarMobile: React.FC<Props> = ({ sidebarField }) => {
  const dispatch = useDispatch();

  return (
    <section className={"sidebarMobile"}>
      <div>
        <div className={"header"}>
          <h1>Głosowania</h1>
          <img
            src={cancelIcon}
            alt={"cancelIcon"}
            role={"presentation"}
            onClick={() => dispatch(toggleSidebar())}
          />
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
      <div className={"mt20"}>
        <div className={"header"}>
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
