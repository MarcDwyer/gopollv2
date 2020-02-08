import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import validate from "uuid-validate";
import { useParams } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";
import { FGET_POLL } from "../../types/message_types";
import { Card, InnerCard } from "../../styled-components/styles";

import VotePoll from "../../components/VotePoll/vote_poll";
import Chart from "../../components/Chart/chart";
import { CardHeader } from "../../styled-components/styles";

type Params = {
  view: string;
  pollID: string;
};

const PollViewer = () => {
  const { pollID, view } = useParams<Params>();
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

  const renderView = () => {
    if (!socket || !poll) {
      return null;
    }
    switch (view) {
      case "vote":
        return <VotePoll socket={socket} poll={poll} />;
      case "chart":
        return <Chart poll={poll} />;
      default:
        return <CardHeader>Invalid URL</CardHeader>;
    }
  };
  return (
    <Card>
      <InnerCard width="550px">{renderView()}</InnerCard>
    </Card>
  );
};

export default PollViewer;
