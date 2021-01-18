import React, { useState, useEffect } from "react";
import "./polls.styles.scss";
import Http from "../../services/http.service";
import { Poll } from "../../types";
import { Link } from "react-router-dom";

const PollsPage: React.FC = () => {
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
      <div className={"tableWrapper"}>
        {polls.length > 0 ? (
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
              {polls.map((poll) => {
                return (
                  <tr key={poll.id}>
                    <td>
                      <Link
                        to={{
                          pathname: `/polls/${poll.id}`,
                          state: { poll: poll },
                        }}
                      >
                        {poll.title}
                      </Link>
                    </td>
                    <td>{poll.start}</td>
                    <td>{poll.end}</td>
                    <td>{poll.candidates?.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span>Niestety nie znaleziono żadnych głosowań</span>
        )}
      </div>
    </section>
  );
};

export default PollsPage;
