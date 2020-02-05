import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../../components/Nav/nav";

import { setSocket } from "../../../actions/socket_actions";
import { useHistory } from "react-router-dom";
import { FPOLL_DATA, FPOLL_ID } from "../../../types/message_types";

import PollViewer from "../Poll-Viewer/poll-viewer";

import "./main.scss";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:5000");
    handleSocketMsgs(ws);
    dispatch(setSocket(ws));
  }, []);

  const handleSocketMsgs = (ws: WebSocket) => {
    ws.addEventListener("message", evt => {
      const data = JSON.parse(evt.data);
      switch (data.type) {
        case FPOLL_DATA:
        case FPOLL_ID:
          history.push(`/vote/${data.id}`);
      }
    });
  };
  console.log("main rendered");
  return (
    <div className="main">
      <Nav />
      <Switch>
        <Route path={"/:view/:pollID"} component={PollViewer} />
        <Route path="/" component={CreatePoll} />
      </Switch>
    </div>
  );
};

export default Main;
