import React from "react";
import { Link } from "react-router-dom";

import "./nav.scss";

const Nav = () => {
  return (
    <div className="navbar">
      <div className="inner-nav">
        <Link to="/" className="logo header">
          GoPoll.me
        </Link>
        <Link to="/about" className="about-link header">
          <span>Info</span>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
