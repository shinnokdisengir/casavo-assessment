import { createBrowserHistory as createHistory } from "history";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Route, Router } from "react-router-dom";
import App from "./App";
import DataProvider from "./core/Data";
import reportWebVitals from "./reportWebVitals";
import "./GlobalStyles";
import GlobalStyles from "./GlobalStyles";
import StackNavigationProvider from "./core/StackNavigation";

const history = createHistory();
if (!history.location.state)
  history.replace({ ...history.location, state: [] });

ReactDOM.render(
  <StrictMode>
    <GlobalStyles />
    <DataProvider>
      <StackNavigationProvider>
        <Router history={history}>
          <Route component={App} />
        </Router>
      </StackNavigationProvider>
    </DataProvider>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
