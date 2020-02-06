import { combineReducers } from "redux";

import PollReducer, { PollState } from "./poll_reducer";
import SocketReducer, { SocketState } from "./socket_reducer";

export type Action = {
  type: Symbol;
  payload: any;
};
export type ReduxStore = {
  socket: SocketState;
  poll: PollState;
};
export default combineReducers({
  socket: SocketReducer,
  poll: PollReducer
});
