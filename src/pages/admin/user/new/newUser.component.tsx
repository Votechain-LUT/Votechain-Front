import React from "react";
import "./newUser.styles.scss";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import UserForm from "../../../../components/userForm/userForm.component";

const NewUserPage: React.FC = () => {
  return (
    <section className={"newUserPage"}>
      <Sidebar sidebarField={"newUser"} />
      <div className={"wrapper"}>
        <span className={"title"}>Dodaj użytkownika</span>
        <UserForm />
      </div>
    </section>
  );
};

export default NewUserPage;
