import map from "lodash/map";
import React, { FunctionComponent, HTMLProps, useCallback } from "react";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import styled from "styled-components";
import { v1 } from "uuid";
import { useData } from "../core/Data";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const UserList: FunctionComponent<Props> = ({ className }) => {
  const history = useHistory();
  const { users } = useData();
  const handleAdd = useCallback(
    () => history.push(`/create/${v1()}`),
    [history]
  );

  return (
    <div className={className}>
      <div>
        <h2>User List</h2>
        {map(users, (_, name) => (
          <div key={name}>
            <Link to={`/edit/${name}`}>{name}</Link>
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
