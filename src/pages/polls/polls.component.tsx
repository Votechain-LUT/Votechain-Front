import React, { useState, useEffect } from "react";
import "./polls.styles.scss";
import Http from "../../services/http.service";
import { Poll } from "../../types";
import { Link } from "react-router-dom";

const PollsPage: React.FC = () => {
  const [polls, setPolls] = useState<Poll[]>([]);
  const [pollType, setPollType] = useState("ongoing");
  useEffect(() => {
    const http = new Http();
    const fetchPolls = async () => {
      const json = await http.getVoterPolls(pollType);
      setPolls(json.data);
    };
    fetchPolls();
  }, [pollType]);
  return (
    <section className={"pollsPage"}>
      <div className={"links"}>
        <span
          role={"presentation"}
          onClick={() => setPollType("ongoing")}
          className={`${pollType === "ongoing" ? "active" : ""}`}
        >
          Trwające głosowania
        </span>
        <span
          role={"presentation"}
          onClick={() => setPollType("ended")}
          className={`${pollType === "ended" ? "active" : ""}`}
        >
          Zakończone głosowania
        </span>
      </div>
      <div className={"tableWrapper"}>
        {polls.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nazwa głosowania</th>
                <th>Data rozpoczęcia głosowania</th>
                <th>Data zakończenia głosowania</th>
                <th>Liczba kandydatów</th>
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => {
                return (
                  <tr key={poll.id}>
                    <td>{poll.title}</td>
                    <td>{poll.start}</td>
                    <td>{poll.end}</td>
                    <td>{poll.candidates?.length}</td>
                    <td>
                      {pollType === "ended" ? (
                        <Link
                          to={{
                            pathname: `polls/${poll.id}/results`,
                            state: { poll: poll },
                          }}
                        >
                          Wyniki/weryfikacja
                        </Link>
                      ) : (
                        <Link
                          to={{
                            pathname: `/polls/${poll.id}`,
                            state: { poll: poll },
                          }}
                        >
                          Oddaj głos
                        </Link>
                      )}
                    </td>
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
