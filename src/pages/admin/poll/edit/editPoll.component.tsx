import React from "react";
import "./editPoll.styles.scss";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import PollForm from "../../../../components/pollForm/pollForm.component";

const EditPollPage: React.FC = () => {
  return (
    <section className={"editPollPage"}>
      <Sidebar sidebarField={""} />
      <div className={"wrapper"}>
        <span className={"title"}>Edytuj głosowanie</span>
        <PollForm />
      </div>
    </section>
  );
};

export default EditPollPage;
