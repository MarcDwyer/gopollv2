import { FPollData } from "../types/poll_types";
import { SET_POLL } from "../reducers/poll_reducer";

export const setPoll = (poll: FPollData) => ({ type: SET_POLL, payload: poll });
