import React, { useEffect } from "react";
import io from "socket.io-client";
import { Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Router } from "react-router";
import { createBrowserHistory } from "history";

import { setSocket } from "../../actions/socket_actions";
import { setPoll } from "../../actions/poll_actions";

import CreatePoll from "../Create-Poll/create";
import Nav from "../Nav/nav";
import SharePoll from "../Share-Poll/sharepoll";

import { FPollData, FErrorMessage, FCreatedPoll } from "../../types/poll_types";
import { FPOLL_DATA, FBERROR, FCREATED_POLL } from "../../types/message_types";
// import { setLocalPoll } from "../../storage_methods/localstorage";

import PollViewer from "../Poll-Viewer/poll-viewer";

import { setError } from "../../actions/error_actions";

import "./main.scss";

export const isDev =
  !process.env.NODE_ENV || process.env.NODE_ENV === "development";

const Main = () => {
  const dispatch = useDispatch();
  const history = createBrowserHistory();

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
    <main>
      <Router history={history}>
        <Nav />
        <SharePoll />
        <div className="poll-viewer">
          <Switch>
            <Route path={"/:view/:pollID"} component={PollViewer} />
            <Route path="/" component={CreatePoll} />
          </Switch>
        </div>
      </Router>
    </main>
  );
};

export default Main;
