import React, {
  FunctionComponent,
  HTMLProps,
  useCallback,
  useEffect,
} from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { useStackNavigation } from "./core/StackNavigation";
import Fade from "react-reveal/Fade";
import UserList from "./pages/UserList";

interface Props extends HTMLProps<HTMLDivElement>, RouteComponentProps {}

const App: FunctionComponent<Props> = ({ className }) => {
  const { stack, pushPage, popPage } = useStackNavigation();

  const handleContainerClick = useCallback(
    (index) => {
      if (index < stack.length - 1) {
        if (window.confirm("Do you want to cancel operation?")) popPage();
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
        <Fade key={index} right distance="32px" duration={100}>
          <div
            className="container"
            onClick={() => handleContainerClick(index)}
            style={{
              left: `calc(50% - 150px + ${index * 20}px)`,
            }}
          >
            {page}
          </div>
        </Fade>
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
    top: calc(50% - 200px);
  }
`;

export default StyledApp;
