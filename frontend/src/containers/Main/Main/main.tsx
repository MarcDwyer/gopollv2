import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";

import { setSocket } from "../../../actions/socket_actions";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../../components/Nav/nav";

import { FPoll, FPollData } from "../../../types/poll_types";
import { FPOLL_DATA, FPOLL_ID } from "../../../types/message_types";

import PollViewer from "../Poll-Viewer/poll-viewer";

import "./main.scss";
import { setPoll } from "../../../actions/poll_actions";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const ws = io("http://localhost:5000");
    socketHandler(ws);
    dispatch(setSocket(ws));
  }, []);

  const socketHandler = (wss: SocketIOClient.Socket) => {
    wss.on(FPOLL_ID, (id: any) => {
      history.push(`/vote/${id}`);
    });
    wss.on(FPOLL_DATA, (poll: FPollData) => {
      if (!poll) {
        console.log("poll not found");
        return;
      }
      dispatch(setPoll(poll));
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
