import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import validate from "uuid-validate";
import { Route, useParams } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";
import { FGET_POLL } from "../../types/message_types";

import VotePoll from "../../components/VotePoll/vote_poll";

type Params = {
  view: string;
  pollID: string;
};

const PollViewer = () => {
  const { view, pollID } = useParams<Params>();
  const { poll, socket } = useSelector((state: ReduxStore) => state);

  useEffect(() => {
    if (socket && pollID) {
      const isValid = validate(pollID);
      console.log(isValid);
      if (isValid) {
        socket.emit(FGET_POLL, pollID);
      }
    }
  }, [socket]);
  return (
    <React.Fragment>
      {poll && socket && (
        <Route
          path={`/vote/:pollID`}
          render={props => <VotePoll {...props} poll={poll} socket={socket} />}
        />
      )}
    </React.Fragment>
  );
};

export default PollViewer;
