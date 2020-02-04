import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../../components/Nav/nav";

import "./main.scss";
import { setSocket } from "../../../actions/socket_actions";

const Main = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSocket());
  }, []);
  return (
    <div className="main">
      <Nav />
      <Switch>
        <Route path="/" component={CreatePoll} />
      </Switch>
    </div>
  );
};

export default Main;
