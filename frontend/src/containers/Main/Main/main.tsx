import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../../components/Nav/nav";

import { setSocket } from "../../../actions/socket_actions";
import { Action } from "../../../reducers/reducers";

import { FPOLL_DATA } from "../../../types/message_types";
import { history } from "../../../index";
import "./main.scss";

const handleSocketMsgs = (ws: WebSocket, dispatch: Dispatch<Action>) => {
  ws.addEventListener("message", evt => {
    const data = JSON.parse(evt.data);
    switch (data.type) {
      case FPOLL_DATA:
        console.log(data);
    }
  });
};

const Main = () => {
  const dispatch = useDispatch();
  console.log(history);
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    handleSocketMsgs(ws, dispatch);
    dispatch(setSocket(ws));
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
