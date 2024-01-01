import React, { useState } from "react";
import "./Register.css";
import Nav from "../../components/nav/Nav";
import img from "../../assets/img/login-svg.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [profilePic, setProfilePic] = useState({ profilePic: "" });

  const navigate = useNavigate();

  const handleRegister = async () => {
    console.log({ username, email, password, profilePic });
    try {
      await axios.post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
        profilePic,
      });
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
    <>
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
              className="register-form-input"
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="register-form-input"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="register-form-input"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
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
            <button type="submit">Register</button>
          </form>
        </div>
        <div className="register-img-wrapper">
          <img src={img} alt="" />
        </div>
      </div>
    </>
  );
};

export default Register;
