import React, { useState, useEffect } from "react";
import "./polls.styles.scss";
import Http from "../../services/http.service";
import { Poll } from "../../types";

const PollsPage: React.FC = () => {
  const [showOnGoingPolls, toggleBreadcumbOption] = useState(true);
  const [polls, setPolls] = useState<Poll[]>([]);
  useEffect(() => {
    const http = new Http();
    const fetchPolls = async () => {
      const json = await http.getVoterPolls();
      setPolls(json.data);
    };
    fetchPolls();
  }, []);
  return (
    <section className={"pollsPage"}>
      <div className={"breadcumbs"}>
        <span className={`${showOnGoingPolls ? "bold" : ""}`}>
          Trwające głosowania
        </span>
        <span className={`${!showOnGoingPolls ? "bold" : ""}`}>
          Twoje głosowania
        </span>
      </div>
      <div className={"tableWrapper"}>
        <table>
          <thead>
            <tr>
              <th>Nazwa głosowania</th>
              <th>Data rozpoczęcia głosowania</th>
              <th>Data zakończenia głosowania</th>
              <th>Liczba kandydatów</th>
            </tr>
          </thead>
          <tbody>
            {polls.length > 0 ? (
              polls.map((poll) => {
                return (
                  <tr key={poll.id}>
                    <td>{poll.title}</td>
                    <td>{poll.start}</td>
                    <td>{poll.end}</td>
                    <td>{poll.candidates?.length}</td>
                  </tr>
                );
              })
            ) : (
              <span>Niestety nie znaleziono żadnych głosowań</span>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default PollsPage;
