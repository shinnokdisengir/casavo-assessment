import range from "lodash/range";
import React, {
  FunctionComponent,
  HTMLProps,
  useCallback,
  useEffect,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import StackNavigationProvider, {
  useStackNavigation,
} from "./core/StackNavigation";
import UserList from "./pages/UserList";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const App: FunctionComponent<Props> = ({ className }) => {
  const { stack, pushPage, popPage } = useStackNavigation();

  const handleContainerClick = useCallback(
    (index) => {
      if (index < stack.length - 1) {
        if (window.confirm("Do you want to cancel operation?"))
          range(stack.length - 1 - index).forEach(popPage);
      }
    },
    [popPage, stack.length]
  );

  useEffect(() => {
    pushPage(<UserList />);
  }, [pushPage]);

  return (
    <div className={className}>
      {stack.map((page, index) => (
        <div
          className="container"
          onClick={() => handleContainerClick(index)}
          style={{
            left: `calc(50% + ${index * 20}px)`,
          }}
          key={index}
        >
          {page}
        </div>
      ))}
    </div>
  );
};

const StyledApp = styled(App)`
  .container {
    padding: 8px 16px;
    background-color: white;
    border: 1px solid grey;
    border-radius: 4px;
    margin: auto;
    width: 300px;
    height: 400px;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default StyledApp;
