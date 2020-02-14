import { IncPoll, PollData, Option } from "../types/poll_types";
import uuid from "uuid";

export const structPoll = (poll: IncPoll): [number, PollData] => {
  const { options, question, filterIps } = poll;
  const delTime = 60000 * 60 * 5;
  const newPoll = {
    id: uuid(),
    expiresIn: getExpiresIn(delTime),
    question,
    ipFilter: filterIps ? {} : null,
    options: structOptions(options)
  };
  return [delTime, newPoll];
};

const getExpiresIn = (delTime: number): number => {
  let futureDate = Date.now();
  futureDate += delTime;
  return new Date(futureDate).getTime();
};

const structOptions = (opts: string[]): { [key: string]: Option } => {
  return opts
    .filter(o => o.length)
    .reduce((obj, value, index) => {
      obj[`option-${index + 1}`] = {
        count: 0,
        value
      };
      return obj;
    }, {});
};
