import { combineReducers } from "redux";

import PollReducer from "./poll_reducer";
import SocketReducer from "./socket_reducer";
import { FPollData } from "../types/poll_types";

export type Action = {
  type: Symbol;
  payload: any;
};
export type ReduxStore = {
  socket: SocketIOClient.Socket | null;
  poll: FPollData | null;
};
export default combineReducers({
  socket: SocketReducer,
  poll: PollReducer
});
