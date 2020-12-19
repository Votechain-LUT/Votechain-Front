import React from "react";
import "./adminTable.styles.scss";
import { Poll } from "../../types/poll.types";
import { getPageName, parseDate } from "../../helpers";
import { useHistory } from "react-router";

type Props = {
  polls: Poll[];
  sidebarField: string;
};

export const AdminTable: React.FC<Props> = ({ polls, sidebarField }) => {
  const history = useHistory();

  return (
    <div className={"adminTableWrapper"}>
      <span className={"title"}>{getPageName(sidebarField)}</span>
      {polls.length ? (
        <div className={"wrapper"}>
          <table>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Data rozpoczęcia</th>
                <th>Data zakończenia</th>
                <th>Liczba kandydatów</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => {
                return (
                  <tr
                    role={"presentation"}
                    onClick={() =>
                      history.push({
                        pathname: `/admin/poll/${poll.id}`,
                        state: { pollType: sidebarField },
                      })
                    }
                    key={poll.id}
                  >
                    <td>{poll.title}</td>
                    <td>{parseDate(poll.start)}</td>
                    <td>{parseDate(poll.end)}</td>
                    <td>{poll.candidates.length}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <span>Nie znaleziono żadnych głosowań</span>
      )}
    </div>
  );
};
