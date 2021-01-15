import React, { useEffect, useState } from "react";
import "./userList.styles.scss";
import { Sidebar } from "../../../../components/sidebar/sidebar.component";
import { User } from "../../../../types";
import Http from "../../../../services/http.service";

const UserListPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const http = new Http();
    const fetchUsers = async () => {
      const json = await http.getUsers();
      if (json.data.length > 0) setUsers(json.data);
    };
    fetchUsers();
  }, []);

  return (
    <section className={"usersListPage"}>
      <Sidebar sidebarField={"users"} />
      <div className={"wrapper"}>
        <span className={"title"}>Lista użytkowników</span>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Nazwa użytkownika</th>
                <th>Adres email</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <span> Niestety nie znaleziono żadnych użytkowników.</span>
        )}
      </div>
    </section>
  );
};

export default UserListPage;
