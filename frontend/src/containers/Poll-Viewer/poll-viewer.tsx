import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import validate from "uuid-validate";
import { useParams } from "react-router-dom";
import { ReduxStore } from "../../reducers/reducers";
import { FGET_POLL } from "../../types/message_types";
import { Card, InnerCard } from "../../styled-components/styles";

import VotePoll from "../../components/VotePoll/vote_poll";
import Chart from "../../components/Chart/chart";
import { MyHeader } from "../../styled-components/styles";

type Params = {
  view: string;
  pollID: string;
};

const PollViewer = () => {
  const { pollID, view } = useParams<Params>();
  const { poll, socket } = useSelector((state: ReduxStore) => state);
  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {
    setValid(validate(pollID));
  }, [pollID]);

  useEffect(() => {
    if (valid) {
      socket?.emit(FGET_POLL, pollID);
    }
  }, [valid]);

  const renderView = () => {
    if (!socket) {
      return null;
    }
    if (!poll && valid) {
      return <MyHeader>Poll doesn't exist</MyHeader>;
    }
    if (!valid) {
      return <MyHeader>Not a valid poll ID</MyHeader>;
    }
    if (!poll) {
      return null;
    }
    switch (view) {
      case "vote":
        return <VotePoll socket={socket} poll={poll} />;
      case "chart":
        return <Chart poll={poll} />;
      default:
        return <MyHeader>Invalid URL</MyHeader>;
    }
  };
  return (
    <Card>
      <InnerCard width="550px">{renderView()}</InnerCard>
    </Card>
  );
};

export default PollViewer;
