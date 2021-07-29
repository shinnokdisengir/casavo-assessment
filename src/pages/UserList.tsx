import React, { FunctionComponent, HTMLProps, useCallback } from "react";
import { v1 } from "uuid";
import map from "lodash/map";
import { Link, RouteComponentProps, useHistory } from "react-router-dom";
import { useData } from "../core/Data";
import styled from "styled-components";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const UserList: FunctionComponent<Props> = ({ className }) => {
  const history = useHistory();
  const { users } = useData();
  const goAdd = useCallback(() => history.push(`/create/${v1()}`), [history]);

  return (
    <div className={className}>
      <div>
        <h2>User List</h2>
        <Link to={`/create/${v1()}`}>Prova</Link>
        <button onClick={goAdd}>+ Add</button>
      </div>
      {map(users, (e) => (
        <div key={e.name}>{e.name}</div>
      ))}
    </div>
  );
};

export default styled(UserList)``;
