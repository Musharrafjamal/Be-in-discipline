import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import Nav from "./components/nav/Nav";

const App = () => {
  return (
    <div className="app-container">
      <Nav />
      <Home />
    </div>
  );
};

export default App;
