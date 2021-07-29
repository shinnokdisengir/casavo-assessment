import React, { FunctionComponent, HTMLProps, useCallback } from "react";
import { v1 } from "uuid";
import map from "lodash/map";
import { RouteComponentProps, useHistory } from "react-router-dom";
import { useData } from "../core/Data";
import styled from "styled-components";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const UserDetail: FunctionComponent<Props> = ({ className }) => {
  const { users } = useData();
  console.log(`users`, users);

  return <div className={className}>Detail</div>;
};

export default styled(UserDetail)``;
