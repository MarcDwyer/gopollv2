import React, { useState } from "react";

import { FPollData } from "../../types/poll_types";
import { RouteComponentProps } from "react-router";
import { useHistory } from "react-router-dom";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Button
} from "@material-ui/core";

import { CardHeader } from "../../styled-components/styles";
import { FVOTE } from "../../types/message_types";

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
        option: selected
      };
      props.socket.emit(FVOTE, castedVote);
      history.push(`/chart/${castedVote.id}`);
    }
  };
  return (
    <React.Fragment>
      <CardHeader>{props.poll.question}</CardHeader>
      <div className="poll-vote">
        <FormControl
          style={{ width: "100%" }}
          component="fieldset"
          onSubmit={(e: any) => {
            e.preventDefault();
            console.log("yes");
          }}
        >
          <RadioGroup
            aria-label="Vote"
            name="Vote"
            value={selected}
            onChange={e => setSelect(e.target.value)}
          >
            {Object.entries(props.poll.options).map(([k, v]) => {
              return (
                <FormControlLabel
                  key={k}
                  value={k}
                  control={<Radio />}
                  label={v.value}
                />
              );
            })}
          </RadioGroup>
        </FormControl>
        <Button style={{ width: "100%" }} onClick={handleSubmit}>
          Submit
        </Button>
      </div>
    </React.Fragment>
  );
};

export default VotePoll;
