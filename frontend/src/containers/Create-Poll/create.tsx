import React, { useState, useEffect } from "react";
import {
  Card,
  InnerCard,
  PollInput,
  MyButton,
  MyHeader
} from "../../styled-components/styles";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/reducers";

import { FCREATE_POLL } from "../../types/message_types";

import { FPoll } from "../../types/poll_types";

import "./create.scss";

const CreatePoll = () => {
  const [question, setQuestion] = useState<string>("");
  const [options, setOptions] = useState<string[]>([]);
  const [filterIps, setFilter] = useState<boolean>(false);
  const socket = useSelector((state: ReduxStore) => state.socket);

  const getOptions = (count: number) =>
    Array(count)
      .join(".")
      .split(".");

  const handleOptions = (index: number, value: string) =>
    setOptions(prev => {
      const copy = [...prev];
      copy[index] = value;
      return copy;
    });

  useEffect(() => {
    setOptions(getOptions(3));
  }, []);
  useEffect(() => {
    const len = options.length;
    if (len) {
      if (options.length <= 9 && options[len - 1].length > 1) {
        setOptions([...options, ""]);
      }
    }
  }, [options]);
  return (
    <Card>
      <InnerCard width="550px">
        <MyHeader>Create a poll!</MyHeader>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={e => {
            e.preventDefault();
            const pollData: FPoll = {
              question,
              options,
              filterIps
            };
            socket?.emit(FCREATE_POLL, pollData);
          }}
        >
          <div className="question">
            <PollInput
              label="Question"
              required
              name="question"
              autoComplete="off"
              value={question}
              onChange={e => setQuestion(e.target.value)}
            />
          </div>
          <div className="options">
            {options.map((option, i) => {
              const addFields = {};
              //@ts-ignore
              if (i < 2) addFields["required"] = true;
              return (
                <PollInput
                  key={i}
                  autoComplete="off"
                  label={`Option ${i + 1}`}
                  {...addFields}
                  onChange={e => handleOptions(i, e.target.value)}
                  variant="outlined"
                  value={option}
                />
              );
            })}
            <FormControlLabel
              label="Check duplicate Ips"
              control={
                <Checkbox
                  onChange={() => setFilter(!filterIps)}
                  checked={filterIps}
                />
              }
            />
          </div>
          <MyButton type="submit">Submit</MyButton>
        </form>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
