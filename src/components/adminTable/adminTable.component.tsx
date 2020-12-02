import React from "react";
import "./adminTable.styles.scss";

export const AdminTable = () => {
  return (
    <div className={"adminTableWrapper"}>
      <span className={"title"}>Trwające głosowania</span>
      {/*<span>Brak obecnie trwających głosowań</span>*/}
      <div className={"wrapper"}>
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Data rozpoczęcia</th>
              <th>Data zakończenia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Wybory prezydenckie</td>
              <td>2020-10-02</td>
              <td>2020-10-05</td>
            </tr>
            <tr>
              <td>Wybory prezydenckie</td>
              <td>2020-10-02</td>
              <td>2020-10-05</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
