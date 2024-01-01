import React from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";

const Nav = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");
  const profilePic = localStorage.getItem("profilePic");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("username");
    navigate("/login")
  };

  return (
    <div className="nav-container">
      <div
        className="logo-wrapper"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>Be in discipline</span>
        <p>Developed by <a href="https://musharraf-39357.web.app" target="_blank">Musharraf Jamal</a></p>
      </div>
      {isAuthenticated ? (
        <div className="profile-wrapper">
          <p>{username}</p>
          <img src={profilePic} alt="" />
          <MdLogout
            size={20}
            title="Logout"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          />
        </div>
      ) : (
        <div className="nav-btns-wrapper">
          <Link to="/register" className="nav-register-btn">
            Register
          </Link>
          <Link to="/login" className="nav-login-btn">
            Login
          </Link>
        </div>
      )}
    </div>
  );
};

export default Nav;
