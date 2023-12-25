import React from "react";
import './Nav.css'
import ProfileImg from '../../assets/img/profile.webp'

const Nav = () => {
  return (
    <div className="nav-container">
      <div className="logo">Be in discipline</div>
      <div className="profile-wrapper">
        <p>Musharraf Jamal</p>
        <img src={ProfileImg} alt="" />
      </div>
    </div>
  );
};

export default Nav;
