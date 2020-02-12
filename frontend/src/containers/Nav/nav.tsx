import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";

import { MyHeader } from "../../styled-components/styles";
import { removePoll } from "../../actions/poll_actions";

import "./nav.scss";

const Nav = () => {
  const err = useSelector((state: ReduxStore) => state.error);
  const dispatch = useDispatch();
  return (
    <div className="navbar">
      <div className="inner-nav">
        <Link
          onClick={() => dispatch(removePoll())}
          to="/"
          className="logo header"
        >
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
