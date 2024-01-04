import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { redirect } from "react-router-dom";
import "./login.css";
import Nav from "../../components/nav/Nav";
import img from "../../assets/img/login-svg.svg";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post("https://beindescipline-server.onrender.com/auth/login", {
        username,
        password,
      });
      const token = response.data.token;
      localStorage.setItem("token", token);
      localStorage.setItem("username", username);
      localStorage.setItem("profilePic", response.data.profilePic);

      // navigate("/app");
      redirect("/app")
    } catch (err) {
      console.log("Login falid", err.message);
      setLoginFailed(true);
    }
  };

  return (
    <>
      <Nav />
      <div className="login-container">
        <div className="login-left-wrapper">
          <form className="login-form"onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}>
            <h2>Login</h2>
            <input
              type="text"
              placeholder="Email"
              className="login-form-input"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="login-form-input"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button>Login</button>
          </form>
          {loginFailed && (
            <p
              style={{
                color: "red",
              }}
            >
              Login falid!
            </p>
          )}
        </div>
        <div className="login-img-wrapper">
          <img src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default Login;
