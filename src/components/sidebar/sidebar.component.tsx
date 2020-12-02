import React from "react";
import "./sidebar.styles.scss";

export const Sidebar = () => {
  return (
    <section className={"sidebar"}>
      <div className={"sidebarHeader"}>
        <h1>Głosowania</h1>
      </div>
      <div>
        <ul>
          <li>Dodaj nowe głosowanie</li>
          <li>Trwające głosowania</li>
          <li>Nadchodzące głosowania</li>
          <li>Zakończone głosowania</li>
        </ul>
      </div>
    </section>
  );
};
