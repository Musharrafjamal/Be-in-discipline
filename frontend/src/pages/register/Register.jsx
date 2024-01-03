import React, { useState } from "react";
import "./Register.css";
import Nav from "../../components/nav/Nav";
import img from "../../assets/img/login-svg.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toogleSelector } from "../../redux/slice/toggleSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState({ profilePic: "" });
  const isDarkMode = useSelector(toogleSelector);

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log({ username, email, password, profilePic });
    try {
      await axios.post(
        "https://beindescipline-server.onrender.com/auth/register",
        {
          username,
          email,
          password,
          profilePic,
        }
      );
      console.log("user saved");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err.message);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setProfilePic(base64);
  };

  function convertToBase64(file) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <div
      style={{
        background: isDarkMode
          ? "linear-gradient(180deg, #272727 0%, #151515 100%)"
          : "",
        color: isDarkMode ? "rgba(255, 255, 255, 0.75)" : "",
      }}
    >
      <Nav />
      <div className="register-container">
        <div className="register-left-wrapper">
          <form
            className="register-form"
            onSubmit={(e) => {
              e.preventDefault();
              handleRegister();
            }}
          >
            <h2>Register</h2>
            <input
              type="text"
              placeholder="Name"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
              style={{
                color: isDarkMode ? "white" : "",
                borderBottom: isDarkMode ? "2px solid white" : "",
              }}
              className={isDarkMode ? "register-form-input dark-placeholder" : "register-form-input"}
            />
            <input
              type="email"
              placeholder="Email"
              className={isDarkMode ? "register-form-input dark-placeholder" : "register-form-input"}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              style={{
                color: isDarkMode ? "white" : "",
                borderBottom: isDarkMode ? "2px solid white" : "",
              }}
            />
            <input
              type="password"
              placeholder="Password"
              className={isDarkMode ? "register-form-input dark-placeholder" : "register-form-input"}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              style={{
                color: isDarkMode ? "white" : "",
                borderBottom: isDarkMode ? "2px solid white" : "",
              }}
            />
            <div className="register-form-file-input-wrapper">
              {/* <label htmlFor="profilePic">Upload your Photo</label> */}
              <input
                id="profilePic"
                type="file"
                name="profilePic"
                onChange={handleFileChange}
              />
            </div>
            <button
              type="submit"
              style={{
                background: isDarkMode ? "white" : "",
              }}
            >
              Register
            </button>
          </form>
        </div>
        <div className="register-img-wrapper">
          <img src={img} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Register;
