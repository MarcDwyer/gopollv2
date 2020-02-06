import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import validate from "uuid-validate";
import { Route, useParams } from "react-router-dom";
import { ReduxStore } from "../../../reducers/reducers";
import { FGET_POLL } from "../../../types/message_types";

type Params = {
  view: string;
  pollID: string;
};

const PollViewer = () => {
  const { view, pollID } = useParams<Params>();
  const state = useSelector((state: ReduxStore) => state);

  console.log(state);
  useEffect(() => {
    if (pollID && state.socket) {
      const isValid = validate(pollID);
      console.log(isValid);
      if (isValid) {
        state.socket.emit(FGET_POLL, pollID);
      }
    }
  }, [state.socket]);
  return <React.Fragment>{state.poll && <Route />}</React.Fragment>;
};

export default PollViewer;
