import React from "react";
import "./App.css";
import DataProvider from "./core/Data";

function App() {
  return (
    <DataProvider>
      <div>Ciao</div>
    </DataProvider>
  );
}

export default App;
