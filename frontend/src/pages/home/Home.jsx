import React from "react";
import "./Home.css";
import Nav from "../../components/nav/Nav";

const Home = () => {
  return (
    <div className="home-container">
      <Nav />
      <div className="home-wrapper">
        <div className="home-upper-wrapper">
          <i>Make your future</i> <span>BRIGHT</span> <i>with</i>
        </div>
        <div className="home-lower-wrapper">
          <span>Be in discipline</span>
          <p>A to do app to maintain your life goals and make you more productive</p>
          <div className="home-btns-wrapper">
            <button>Login</button>
            <a href="#">Start without login</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
