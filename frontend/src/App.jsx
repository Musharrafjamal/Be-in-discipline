import React from "react";
import "./App.css";
import Home from "./pages/home/Home";
import { Routes, Route, Navigate } from "react-router-dom";
import ToDo from "./pages/todo/ToDo";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import GuestApp from "./pages/guest-app/GuestApp";

const App = () => {
  const isAuthenticated = localStorage.getItem("token");
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/guest" element={isAuthenticated ? <ToDo /> : <GuestApp />}  />
        <Route path="/app" element={isAuthenticated ? <ToDo /> : <Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
