import React, { useEffect } from "react";
import io from "socket.io-client";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { setSocket } from "../../actions/socket_actions";
import { setPoll } from "../../actions/poll_actions";

import CreatePoll from "../Create-Poll/create";
import Nav from "../Nav/nav";
import SharePoll from "../Share-Poll/sharepoll";

import { FPollData, FErrorMessage, FCreatedPoll } from "../../types/poll_types";
import { FPOLL_DATA, FBERROR, FCREATED_POLL } from "../../types/message_types";

import PollViewer from "../Poll-Viewer/poll-viewer";

import { setError } from "../../actions/error_actions";

import "./main.scss";
import { setLocalPoll } from "../../storage_methods/localstorage";

export const isDev =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const Main = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const url = isDev
      ? "http://localhost:5002"
      : `https://${document.location.hostname}`;

    const ws = io(url, {
      secure: true
    });
    socketHandler(ws);
    dispatch(setSocket(ws));
  }, []);

  const socketHandler = (wss: SocketIOClient.Socket) => {
    wss.on(FCREATED_POLL, (pollData: FCreatedPoll) => {
      setLocalPoll(pollData);
      history.push(`/vote/${pollData.poll_id}`);
    });
    wss.on(FPOLL_DATA, (poll: FPollData) => {
      if (!poll || !Object.keys(poll).length) {
        console.log("poll not found");
        return;
      }
      dispatch(setPoll(poll));
    });
    wss.on(FBERROR, (err: FErrorMessage) => {
      dispatch(setError(err));
    });
  };

  return (
    <div className="main">
      <Nav />
      <SharePoll />
      <div className="poll-viewer">
        <Switch>
          <Route path={"/:view/:pollID"} component={PollViewer} />
          <Route path="/" component={CreatePoll} />
        </Switch>
      </div>
    </div>
  );
};

export default Main;
