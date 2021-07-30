import React, { FunctionComponent } from "react";

import { Redirect, Route, RouteProps, useLocation } from "react-router-dom";

type Props = RouteProps;

const CreateEditRoute: FunctionComponent<Props> = (props) => {
  const { state } = useLocation();

  return !!state ? (
    <Route {...props} />
  ) : (
    <Redirect
      to={{
        pathname: "/",
        state: [],
      }}
    />
  );
};

export default CreateEditRoute;
