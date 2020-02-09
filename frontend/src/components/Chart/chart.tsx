import React from "react";
import { FPollData } from "../../types/poll_types";
import { MyHeader } from "../../styled-components/styles";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

interface Props {
  poll: FPollData;
}

const Chart = (props: Props) => {
  const { poll } = props;

  const chartData = Object.values(poll.options).map(option => {
    const { count, value } = option;
    return {
      name: value,
      votes: count
    };
  });

  return (
    <React.Fragment>
      <MyHeader>{poll.question}</MyHeader>
      <BarChart
        width={500}
        height={300}
        data={chartData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis dataKey="votes" allowDecimals={false} />
        <Tooltip />
        <Legend />
        <Bar dataKey="votes" fill="#8884d8" />
      </BarChart>
    </React.Fragment>
  );
};

export default Chart;
