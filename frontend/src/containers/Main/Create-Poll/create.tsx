import React, { useState, useEffect } from "react";
import {
  Card,
  InnerCard,
  PollInput,
  MyButton
} from "../../../styled-components/styles";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../../reducers/reducers";

import "./create.scss";
import { FCREATE_POLL } from "../../../types/message_types";

type TPollInput = {
  [key: string]: string;
};
const getOptions = (count: number) => {
  const options: TPollInput = {};
  for (let x = 0; x < count; x++) {
    options[`option${x + 1}`] = "";
  }
  return options;
};

function deleteNoLengthKeys(obj: { [key: string]: string }) {
  const newObj = { ...obj };
  for (const k in newObj) {
    if (!newObj[k].length) {
      delete newObj[k];
    }
  }
  return newObj;
}
const CreatePoll = () => {
  const [poll, setPoll] = useState<{ [key: string]: string }>({
    question: ""
  });
  const socket = useSelector((state: ReduxStore) => state.socket);

  useEffect(() => {
    setPoll({ ...poll, ...getOptions(3) });
  }, []);
  useEffect(() => {
    const keys = Object.keys(poll);
    if (poll[keys[keys.length - 1]].length > 1 && keys.length <= 10) {
      setPoll({ ...poll, ...{ [`option${keys.length}`]: "" } });
    }
  }, [poll]);

  const handleChange = (key: string, value: string) => {
    setPoll(prev => {
      const copy = { ...prev };
      //@ts-ignore
      copy[key] = value;
      return copy;
    });
  };
  return (
    <Card>
      <InnerCard width="550px">
        <span className="create-header">Create a poll!</span>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={e => {
            e.preventDefault();
            const packagedPoll = deleteNoLengthKeys(poll);
            const payload = {
              type: FCREATE_POLL,
              pollData: packagedPoll
            };
            socket?.send(JSON.stringify(payload));
          }}
        >
          <div className="question">
            <PollInput
              label="Question"
              required
              name="question"
              autoComplete="off"
              value={poll.question}
              onChange={e => handleChange("question", e.target.value)}
            />
          </div>
          <div className="options">
            {Object.entries(poll)
              .filter(([k]) => k !== "question")
              .map(([k, v]) => {
                return (
                  <PollInput
                    key={k}
                    autoComplete="off"
                    label={k}
                    name={k}
                    onChange={e => handleChange(k, e.target.value)}
                    variant="outlined"
                    value={v}
                  />
                );
              })}
          </div>
          <MyButton type="submit">Submit</MyButton>
        </form>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
