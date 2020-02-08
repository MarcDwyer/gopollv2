import React, { useEffect } from "react";
import io from "socket.io-client";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setSocket } from "../../actions/socket_actions";

import CreatePoll from "../Create-Poll/create";
import Nav from "../../components/Nav/nav";

import { FPollData, FErrorMessage } from "../../types/poll_types";
import { FPOLL_DATA, FPOLL_ID, FBERROR } from "../../types/message_types";

import PollViewer from "../Poll-Viewer/poll-viewer";

import { setPoll } from "../../actions/poll_actions";

import "./main.scss";

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
      console.log(poll);
      dispatch(setPoll(poll));
    });
    wss.on(FBERROR, (err: FErrorMessage) => {
      console.log(err);
    });
  };
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
