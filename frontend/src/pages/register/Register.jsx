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
  const [loading, setLoading] = useState(false);
  const isDarkMode = useSelector(toogleSelector);
  const [profilePicUploadedMsg, setProfilePicUploadedMsg] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setProfilePicUploadedMsg("File uploaded successfully!");
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
          className="register-main-container"
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
                  required
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => setUsername(e.target.value)}
                  style={{
                    color: isDarkMode ? "white" : "",
                    borderBottom: isDarkMode ? "2px solid white" : "",
                  }}
                  className={
                    isDarkMode
                      ? "register-form-input dark-placeholder"
                      : "register-form-input"
                  }
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className={
                    isDarkMode
                      ? "register-form-input dark-placeholder"
                      : "register-form-input"
                  }
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    color: isDarkMode ? "white" : "",
                    borderBottom: isDarkMode ? "2px solid white" : "",
                  }}
                />
                <input
                  required
                  type="password"
                  placeholder="Password"
                  className={
                    isDarkMode
                      ? "register-form-input dark-placeholder"
                      : "register-form-input"
                  }
                  name="password"
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    color: isDarkMode ? "white" : "",
                    borderBottom: isDarkMode ? "2px solid white" : "",
                  }}
                />
                <div className="register-form-file-input-wrapper">
                  <label
                    htmlFor="profilePic"
                    className="profile-pic-label"
                    style={{
                      border: isDarkMode
                        ? "2px dotted rgba(255, 255, 255, 0.75)"
                        : "",
                    }}
                  >
                    {profilePicUploadedMsg ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "1rem",
                        }}
                      >
                        <img
                          src={profilePic}
                          alt=""
                          style={{
                            width: "2rem",
                            height: "2rem",
                            objectFit: "cover",
                          }}
                        />
                        <span>Profile pic Added </span>
                      </div>
                    ) : (
                      "Upload your Photo"
                    )}
                  </label>
                  <input
                    id="profilePic"
                    required
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
      )}
    </>
  );
};

export default Register;
