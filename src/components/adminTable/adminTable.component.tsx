import React from "react";
import { Link } from "react-router-dom";
import "./adminTable.styles.scss";
import { Poll } from "../../types";
import { getPageName } from "../../helpers";
import { useHistory } from "react-router";
import editIcon from "../../assets/edit.png";

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
                <th>Akcje</th>
              </tr>
            </thead>
            <tbody>
              {polls.map((poll) => {
                return (
                  <tr key={poll.id}>
                    <td>
                      <Link
                        to={{
                          pathname: `/admin/poll/${poll.id}`,
                          state: { pollType: sidebarField },
                        }}
                      >
                        {poll.title}
                      </Link>
                    </td>
                    <td>{poll.start}</td>
                    <td>{poll.end}</td>
                    <td>{poll.candidates && poll.candidates.length}</td>
                    <td className={"actionsWrapper"}>
                      <div
                        role={"presentation"}
                        onClick={() =>
                          history.push(`/admin/editPoll/${poll.id}`)
                        }
                        className={"iconContainer"}
                      >
                        <img src={editIcon} alt={"editIcon"} />
                        <span>Edytuj</span>
                      </div>
                    </td>
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
