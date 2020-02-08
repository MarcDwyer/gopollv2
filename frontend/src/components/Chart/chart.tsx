import React from "react";
import { FPollData } from "../../types/poll_types";
import { CardHeader } from "../../styled-components/styles";

interface Props {
  poll: FPollData;
}

const Chart = (props: Props) => {
  const { poll } = props;
  return (
    <React.Fragment>
      <CardHeader>{poll.question}</CardHeader>
      {Object.values(poll.options).map(o => {
        return (
          <div className="option" key={o.value + Math.random() * 1337}>
            <span>
              {o.value}: {o.count}
            </span>
          </div>
        );
      })}
    </React.Fragment>
  );
};

export default Chart;
