import React, { useEffect } from "react";
import map from "lodash/map";
import { useHistory } from "react-router-dom";
import { useData } from "../core/Data";
import "./UserList.css";

function UserList() {
  const history = useHistory();
  const { addUser, users } = useData();
  console.log(`users`, users);
  useEffect(() => {
    console.log(`prova`);
    addUser("ciccio");
  }, [addUser]);

  return (
    <div>
      {map(users, (e) => (
        <div key={e.name}>{e.name}</div>
      ))}
    </div>
  );
}

export default UserList;
