import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components/sidebar/sidebar.component";
import { AdminTable } from "../../../components/adminTable/adminTable.component";
import "./dashboard.styles.scss";
import { useLocation } from "react-router";
import Http from "../../../services/http.service";
import { Poll } from "../../../types";

const AdminDashboard: React.FC = () => {
  const [sidebarField, setSidebarField] = useState("");
  const [polls, setPolls] = useState<Poll[]>([]);
  const location = useLocation();

  useEffect(() => {
    const http = new Http();
    const sidebarField = location.pathname.split("/")[2];
    setSidebarField(sidebarField);
    let json = null;
    const fetchPolls = async () => {
      switch (sidebarField) {
        case "onGoingPolls":
          json = await http.getOngoingPolls();
          break;
        case "futurePolls":
          json = await http.getFuturePolls();
          break;
        case "endedPolls":
          json = await http.getEndedPolls();
          break;
        case "createdPolls":
          json = await http.getFutureCreatedPolls();
          break;
        default:
          json = null;
      }
      if (json) setPolls(json.data);
    };
    fetchPolls();
  }, [location]);
  return (
    <section className={"adminDashboard"}>
      <Sidebar sidebarField={sidebarField} />
      <AdminTable sidebarField={sidebarField} polls={polls} />
    </section>
  );
};

export default AdminDashboard;
