import map from "lodash/map";
import React, { FunctionComponent, HTMLProps, useCallback } from "react";
// import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import styled from "styled-components";
import { useData } from "../core/Data";
import { useStackNavigation } from "../core/StackNavigation";
import UserDetail from "./UserDetail";

interface Props extends HTMLProps<HTMLDivElement> {}

const UserList: FunctionComponent<Props> = ({ className }) => {
  // const history = useHistory();
  const { users } = useData();
  const { pushPage } = useStackNavigation();
  const handleAdd = useCallback(() => {
    pushPage(<UserDetail isCreation />);
  }, [pushPage]);

  const handleEdit = useCallback(
    (name) => {
      pushPage(<UserDetail name={name} friends={users[name]} />);
    },
    [pushPage, users]
  );

  return (
    <div className={className}>
      <div>
        <h2>User List</h2>
        {map(users, (_, name) => (
          <div key={name}>
            <a
              href="about:blank"
              onClick={(e) => {
                e.preventDefault();
                handleEdit(name);
              }}
            >
              {name}
            </a>
          </div>
        ))}
      </div>
      <button className="main-button" onClick={handleAdd}>
        + Add user
      </button>
    </div>
  );
};

export default styled(UserList)``;
