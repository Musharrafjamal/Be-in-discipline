import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./login.css";
import Nav from "../../components/nav/Nav";
import img from "../../assets/img/login-svg.svg";
import { useSelector } from "react-redux";
import { toogleSelector } from "../../redux/slice/toggleSlice";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector(toogleSelector);

  const navigate = useNavigate();
  const localUrl = "http://localhost:5000";
  const backendUrl = "https://beindescipline-server.onrender.com";
  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${localUrl}/auth/login`,
        {
          username,
          password,
        }
      );
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("profilePic", response.data.profilePic);

      await navigate("/app");
    } catch (err) {
      console.log("Login falid", err.message);
      setLoginFailed(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div
          className="loading-wrapper"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
              : "",
          }}
        >
          <div
            aria-label="Orange and tan hamster running in a metal wheel"
            role="img"
            className="wheel-and-hamster"
          >
            <div className="wheel"></div>
            <div className="hamster">
              <div className="hamster__body">
                <div className="hamster__head">
                  <div className="hamster__ear"></div>
                  <div className="hamster__eye"></div>
                  <div className="hamster__nose"></div>
                </div>
                <div className="hamster__limb hamster__limb--fr"></div>
                <div className="hamster__limb hamster__limb--fl"></div>
                <div className="hamster__limb hamster__limb--br"></div>
                <div className="hamster__limb hamster__limb--bl"></div>
                <div className="hamster__tail"></div>
              </div>
            </div>
            <div className="spoke"></div>
          </div>
        </div>
      ) : (
        <div
        className="login-main-container"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
              : "",
            color: isDarkMode ? "rgba(255, 255, 255, 0.75)" : "",
          }}
        >
          <Nav />
          <div className="login-container">
            <div className="login-left-wrapper">
              <form
                className="login-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
                }}
              >
                <h2>Login</h2>
                <input
                  type="text"
                  placeholder="Username"
                  style={{
                    color: isDarkMode ? "white" : "",
                    borderBottom: isDarkMode ? "2px solid white" : "",
                  }}
                  className={
                    isDarkMode
                      ? "login-form-input dark-placeholder"
                      : "login-form-input"
                  }
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Password"
                  style={{
                    color: isDarkMode ? "white" : "",
                    borderBottom: isDarkMode ? "2px solid white" : "",
                  }}
                  className={
                    isDarkMode
                      ? "login-form-input dark-placeholder"
                      : "login-form-input"
                  }
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="submit"
                  style={{
                    background: isDarkMode ? "white" : "",
                  }}
                >
                  Login
                </button>
                {loginFailed && (
                  <p
                    style={{
                      color: "red",
                    }}
                  >
                    Login falid!
                  </p>
                )}
              </form>
            </div>
            <div className="login-img-wrapper">
              <img src={img} alt="" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
