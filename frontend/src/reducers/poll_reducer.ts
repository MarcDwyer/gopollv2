import { Action } from "./reducers";
import { FPollData } from "../types/poll_types";

export type PollState = FPollData | null;

export const SET_POLL = Symbol();

const PollReducer = (state: PollState = null, { type, payload }: Action) => {
  switch (type) {
    case SET_POLL:
      return payload;
    default:
      return state;
  }
};

export default PollReducer;
