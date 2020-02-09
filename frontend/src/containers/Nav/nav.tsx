import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";

import { MyHeader } from "../../styled-components/styles";

import "./nav.scss";

const Nav = () => {
  const err = useSelector((state: ReduxStore) => state.error);
  return (
    <div className="navbar">
      <div className="inner-nav">
        <Link to="/" className="logo header">
          GoPoll.me
        </Link>
        {err && (
          <MyHeader className="error-msg" fontSize={"22px"}>
            {err.error}
          </MyHeader>
        )}
        <Link to="/about" className="about-link header">
          <MyHeader>Info</MyHeader>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
