import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";
import { removePoll } from "../../actions/poll_actions";

import { MyHeader } from "../../styled-components/generic-styles";
import { BorderLink } from "../../styled-components/link-styles";

import "./nav.scss";

const Nav = () => {
  const err = useSelector((state: ReduxStore) => state.error);
  const dispatch = useDispatch();
  const myLinks = [
    {
      to: "/yourpolls",
      header: "Your Polls"
    },
    {
      to: "/about",
      header: "About"
    }
  ];
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
        <div className="links">
          {myLinks.map(({ to, header }, i) => {
            const styles = {
              margin: "auto 10px auto auto",
              borderLeft: i === 0 ? "1px solid black" : ""
            };
            return (
              <BorderLink key={to} to={to} style={styles}>
                <MyHeader>{header}</MyHeader>
              </BorderLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Nav;
