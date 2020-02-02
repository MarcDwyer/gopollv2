import React, { useState, useEffect } from "react";
import { Card, InnerCard } from "../../styled-components/styles";

import "./create.scss";

type PollOptions = {
  value: string;
  type: string;
};
const getOptions = (count: number, type: string) => {
  const options: PollOptions[] = [];
  for (let x = 0; x < count; x++) {
    const option: PollOptions = { value: "", type };
    options.push(option);
  }
  return options;
};
const CreatePoll = () => {
  const [options, setOptions] = useState<PollOptions[]>([]);

  useEffect(() => {
    setOptions(getOptions(3, "input"));
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    console.log(e.target.value);
    setOptions(prevState => {
      console.log(e.target);
      const copy = [...prevState];
      if (copy[index]) copy[index].value = e.target.value;
      return copy;
    });
  };

  return (
    <Card>
      <InnerCard>
        <span className="create-header">Create a poll!</span>
        <div className="options">
          {options.map(({ value, type }, i) => {
            return (
              <input
                placeholder={`Poll option ${i + 1}`}
                key={i}
                value={value}
                type={type}
                onChange={e => handleInputChange(e, i)}
              />
            );
          })}
        </div>
      </InnerCard>
    </Card>
  );
};

export default CreatePoll;
