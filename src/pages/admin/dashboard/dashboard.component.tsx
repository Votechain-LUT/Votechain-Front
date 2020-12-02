import React from "react";
import { Sidebar } from "../../../components/sidebar/sidebar.component";
import { AdminTable } from "../../../components/adminTable/adminTable.component";
import "./dashboard.styles.scss";

const AdminDashboard: React.FC = () => {
  return (
    <section className={"adminDashboard"}>
      <Sidebar />
      <AdminTable />
    </section>
  );
};

export default AdminDashboard;
