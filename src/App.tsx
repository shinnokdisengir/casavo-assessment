import React from "react";
import { Route, useHistory } from "react-router-dom";
import "./App.css";
import DataProvider from "./core/Data";
import UserList from "./pages/UserList";

function App() {
  const history = useHistory();
  return (
    <DataProvider>
      <Route component={UserList} />
    </DataProvider>
  );
}

export default App;
