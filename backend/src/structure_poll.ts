import { IncPoll, PollData, Option } from "./types/poll_types";

export const structPoll = (poll: IncPoll) => {
  const { options, question, filterIps } = poll;
  return {
    question,
    filterIps,
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
