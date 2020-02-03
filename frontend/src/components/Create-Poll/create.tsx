import React, { useState, useEffect } from "react";
import {
  Card,
  InnerCard,
  PollInput,
  MyButton
} from "../../styled-components/styles";

import "./create.scss";

type PollOptions = {
  value: string;
  type: string;
  error: boolean;
};
const getOptions = (count: number, type: string) => {
  const options: PollOptions[] = [];
  for (let x = 0; x < count; x++) {
    const option: PollOptions = { value: "", type, error: false };
    options.push(option);
  }
  return options;
};
const CreatePoll = () => {
  const [question, setQuest] = useState<PollOptions>({
    type: "input",
    value: "",
    error: false
  });
  const [options, setOptions] = useState<PollOptions[]>([]);

  useEffect(() => {
    setOptions(getOptions(3, "input"));
  }, []);

  useEffect(() => {
    const len = options.length;
    if (len) {
      if (options[len - 1].value.length && len <= 9) {
        const newOption = { type: "text", value: "", error: false };
        setOptions(prevState => [...prevState, newOption]);
      }
    }
  }, [options]);
  const handleInputChange = (value: string, index: number) => {
    setOptions(prevState => {
      const copy = [...prevState];
      if (copy[index]) copy[index].value = value;
      return copy;
    });
  };

  const handleSubmit = () => {
    if (!question.value.length) return;
    const filterOptions = options.filter(o => o.value.length);
    console.log(filterOptions);
  };

  return (
    <Card>
      <InnerCard width="550px">
        <span className="create-header">Create a poll!</span>
        <PollInput
          placeholder="Enter a question"
          value={question.value}
          label="Question"
          type={question.type}
          required
          error={question.error}
          onChange={e => {
            e.persist();
            setQuest(p => {
              const q = { ...p };
              q.value = e.target.value;
              return q;
            });
          }}
        />
        <div className="options">
          {options.map(({ value, type, error }, i) => {
            return (
              <PollInput
                label={`Option ${i + 1}`}
                key={i}
                value={value}
                variant="outlined"
                type={type}
                error={error}
                onChange={e => handleInputChange(e.target.value, i)}
              />
            );
          })}
        </div>
        <MyButton onClick={handleSubmit}>Submit</MyButton>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
