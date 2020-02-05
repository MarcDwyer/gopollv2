import { Poll } from "./types/poll_types";

export const structOptions = (poll: Poll) => {
  const result = {};
  for (const [k, v] of Object.entries(poll)) {
    if (k !== "question") {
      result[k] = {
        value: v,
        count: 0
      };
    }
  }
  return result;
};
