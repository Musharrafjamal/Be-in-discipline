import React, { useEffect } from "react";
import "./Home.css";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"
import { toogleSelector } from "../../redux/slice/toggleSlice";

const Home = () => {
  const isAuthenticated = localStorage.getItem("token");
  const isDarkMode = useSelector(toogleSelector)

  console.log(isDarkMode)
  return (
    <div
      className="home-container"
      // style={{
      //   background: isLightMode ? "" : "gray",
      // }}
    >
      <Nav />
      <div className="home-wrapper">
        <div className="home-upper-wrapper">
          <i>Make your future</i> <span>BRIGHT</span> <i>with</i>
        </div>
        <div className="home-lower-wrapper">
          <span>Be in discipline</span>
          <p>
            A to do app to maintain your life goals and make you more
            productive.
          </p>
          {isAuthenticated ? (
            <div className="home-btns-wrapper">
              <Link className="home-first-btn" to="/app">
                Go to app
              </Link>
            </div>
          ) : (
            <div className="home-btns-wrapper">
              <Link className="home-first-btn" to="/login">
                Login
              </Link>
              <Link className="home-second-btn" to="/guest">
                Start without login
              </Link>
            </div>
          )}
        </div>
        <footer>2023 - All copyright reserved Be in decsipline</footer>
      </div>
    </div>
  );
};

export default Home;
