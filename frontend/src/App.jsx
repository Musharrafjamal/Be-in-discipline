import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import ToDo from "./pages/todo/ToDo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import GuestApp from "./pages/guest-app/GuestApp";

const App = () => {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guest" element={<GuestApp />} />
        <Route path="/app" element={<ToDo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
