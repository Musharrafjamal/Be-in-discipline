import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { isDarkMode } from "../../redux/slice/toggleSlice";

const Nav = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("token");
  const profilePic = localStorage.getItem("profilePic");
  const username = localStorage.getItem("username");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("profilePic");
    localStorage.removeItem("username");
    navigate("/login");
  };
  const [isChecked, setChecked] = useState(() => {
    const data = JSON.parse(localStorage.getItem("isDarkMode"));
    return data || false;
  });
  const dispatch = useDispatch();

  const handleCheckboxChange = () => {
    setChecked(!isChecked)
    dispatch(isDarkMode())
  };

  useEffect(() => {
    localStorage.setItem("isDarkMode", isChecked);
    // console.log(isChecked);
  }, [isChecked]);

  return (
    <div className="nav-container">
      <div
        className="logo-wrapper"
        onClick={() => {
          navigate("/");
        }}
      >
        <span>Be in discipline</span>
        <p>
          Developed by{" "}
          <a href="https://musharraf-39357.web.app" target="_blank">
            Musharraf Jamal
          </a>
        </p>
      </div>
      {isAuthenticated ? (
        <div className="profile-wrapper">
          <input
            type="checkbox"
            className="theme-checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
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
          <input
            type="checkbox"
            className="theme-checkbox"
            onChange={handleCheckboxChange}
            checked={isChecked}
          />
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
