import React, { useState, useEffect, FormEvent } from "react";
import { MyButton, MyHeader } from "../../styled-components/generic-styles";
import { Card, InnerCard } from "../../styled-components/card-styles";
import { useSelector } from "react-redux";
import { ReduxStore } from "../../reducers/reducers";

import { CreateInput, CheckedInput } from "../../styled-components/inputs";
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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const pollData: FPoll = {
      question,
      options,
      filterIps
    };
    socket?.emit(FCREATE_POLL, pollData);
  };

  useEffect(() => {
    setOptions(getOptions(2));
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
      <InnerCard>
        <MyHeader margin="auto">Create a poll!</MyHeader>
        <form onSubmit={handleSubmit}>
          <div className="question">
            <label className="question-label">Question</label>
            <CreateInput
              required
              name="question"
              placeholder="question goes here"
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
                <div className="option" key={i}>
                  <label className="option-label">{`Option #${i + 1}`}</label>
                  <CreateInput
                    autoComplete="off"
                    {...addFields}
                    onChange={e => handleOptions(i, e.target.value)}
                    value={option}
                  />
                </div>
              );
            })}
            <div className="checkbox-div">
              <CheckedInput
                onChange={() => setFilter(!filterIps)}
                type="checkbox"
                checked={filterIps}
              />
              <label>Check for duplicate Ips?</label>
            </div>
            <MyButton
              color="primary"
              className="create-btn"
              type="submit"
              width="115px"
            >
              Submit
            </MyButton>
          </div>
        </form>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
