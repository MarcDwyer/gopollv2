import { IncPoll, PollData, Option } from "../types/poll_types";
import uuid from "uuid";

export const structPoll = (poll: IncPoll): PollData => {
  const { options, question, filterIps } = poll;
  return {
    id: uuid(),
    question,
    ipFilter: filterIps ? {} : null,
    options: structOptions(options)
  };
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
