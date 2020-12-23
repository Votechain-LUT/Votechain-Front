import React from "react";
import "./newPoll.styles.scss";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import PollForm from "../../../../components/pollForm/pollForm.component";

const NewPollPage = () => {
  return (
    <section className={"newPollPage"}>
      <Sidebar sidebarField={"newPoll"} />
      <div className={"wrapper"}>
        <span className={"title"}>Dodaj głosowanie</span>
        <PollForm />
      </div>
    </section>
  );
};

export default NewPollPage;
