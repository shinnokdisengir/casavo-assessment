import React, { FunctionComponent, HTMLProps } from "react";
import { Redirect, Route, RouteComponentProps, Switch } from "react-router-dom";
import styled from "styled-components";
import CreateEditRoute from "./core/CreateEditRoute";
import UserDetail from "./pages/UserDetail";
import UserList from "./pages/UserList";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const App: FunctionComponent<Props> = ({ className }) => (
  <div className={className}>
    <Switch>
      <CreateEditRoute exact path="/create/:name" component={UserDetail} />
      <CreateEditRoute exact path="/edit/:name" component={UserDetail} />
      <Route exact path="/" component={UserList} />
      <Redirect
        to={{
          pathname: "/",
          state: [],
        }}
      />
    </Switch>
  </div>
);

const StyledApp = styled(App)`
  padding: 8px 16px;
  background-color: white;
  margin: auto;
  width: 300px;
  height: 400px;
  overflow-y: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default StyledApp;
