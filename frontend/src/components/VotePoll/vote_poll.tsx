import React, { useState } from "react";

import { FPollData } from "../../types/poll_types";
import { useHistory } from "react-router-dom";
import { MyHeader, MyButton } from "../../styled-components/generic-styles";
import { FVOTE } from "../../types/message_types";
import { CheckedInput } from "../../styled-components/inputs";

import "./votepoll.scss";

interface Props {
  poll: FPollData;
  socket: SocketIOClient.Socket;
}

const VotePoll = (props: Props) => {
  const [selected, setSelect] = useState<null | string>(null);
  const history = useHistory();
  const handleSubmit = () => {
    if (selected) {
      const castedVote = {
        id: props.poll.id,
        filterIps: props.poll.filterIps,
        option: selected
      };
      props.socket.emit(FVOTE, castedVote);
      history.push(`/chart/${castedVote.id}`);
    }
    // TODO: Add Error msg here
    // user must have selected an option
  };
  return (
    <React.Fragment>
      <MyHeader>{props.poll.question}</MyHeader>
      <div className="poll-vote">
        {Object.entries(props.poll.options).map(([k, v]) => {
          return (
            <div className="vote" key={k}>
              <CheckedInput
                onChange={() => setSelect(k)}
                type="radio"
                key={k}
                value={k}
                checked={selected === k ? true : false}
              />
              <label>{v.value}</label>
            </div>
          );
        })}
        <MyButton
          style={{ margin: "10px auto auto 10px" }}
          onClick={handleSubmit}
          bgColor={!selected ? "#C94747" : undefined}
        >
          {!selected ? "Choose!" : "Submit"}
        </MyButton>
      </div>
    </React.Fragment>
  );
};

export default VotePoll;
