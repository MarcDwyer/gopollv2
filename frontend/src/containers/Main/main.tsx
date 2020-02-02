import React from "react";
import { Switch, Route } from "react-router-dom";

import CreatePoll from "../../components/Create-Poll/create";
import Nav from "../../components/Nav/nav";

import "./main.scss";

const Main = () => {
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
