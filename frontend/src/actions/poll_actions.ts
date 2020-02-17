import { Dispatch } from "redux";
import { FPollData } from "../types/poll_types";
import { SET_POLL } from "../reducers/poll_reducer";
import { ReduxStore } from "../reducers/reducers";
import { FREMOVE_ROOM } from "../types/message_types";

export type GetState = () => ReduxStore;

export const setPoll = (poll: FPollData) => {
  return { type: SET_POLL, payload: poll };
};

export const removePoll = () => (dispatch: Dispatch, getState: GetState) => {
  const { socket } = getState();
  socket?.emit(FREMOVE_ROOM);
  dispatch({
    type: SET_POLL,
    payload: null
  });
};
