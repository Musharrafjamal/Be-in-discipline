import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import ToDo from "./pages/todo/ToDo";

const App = () => {
  return (
    <div className="app-container">
      <Home />
      {/* <ToDo /> */}
    </div>
  );
};

export default App;
