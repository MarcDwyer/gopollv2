import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../../components/Nav/nav";

import { setSocket } from "../../../actions/socket_actions";
import { Action } from "../../../reducers/reducers";

import "./main.scss";

const handleSocketMsgs = (ws: WebSocket, dispatch: Dispatch<Action>) => {
  ws.addEventListener("message", evt => {
    const parsed = JSON.parse(evt.data);
    console.log(parsed);
  });
};

const Main = () => {
  const dispatch = useDispatch();
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
