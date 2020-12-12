import React, { useEffect, useState } from "react";
import { Sidebar } from "../../../components/sidebar/sidebar.component";
import { AdminTable } from "../../../components/adminTable/adminTable.component";
import "./dashboard.styles.scss";
import { useLocation } from "react-router";
import { Poll } from "../../../types/poll.types";
import Http from "../../../services/http.service";

const AdminDashboard: React.FC = () => {
  const [pollType, setPollType] = useState("");
  const [polls, setPolls] = useState<Poll[]>([]);
  const location = useLocation();

  useEffect(() => {
    const http = new Http();
    const pollType = location.pathname.split("/")[2];
    setPollType(pollType);
    let json = null;
    const fetchPolls = async () => {
      switch (pollType) {
        case "onGoingPolls":
          json = await http.getOngoingPolls();
          break;
        case "futurePolls":
          json = await http.getOngoingPolls();
          break;
        default:
          json = null;
      }
      console.log(json);
    };
    fetchPolls();
  }, [location]);

  return (
    <section className={"adminDashboard"}>
      <Sidebar sidebarField={pollType} />
      <AdminTable />
    </section>
  );
};

export default AdminDashboard;
