import { combineReducers } from "redux";

import SocketReducer, { SocketState } from "./socket_reducer";

export type Action = {
  type: Symbol;
  payload: any;
};
export type ReduxStore = {
  socket: SocketState;
};
export default combineReducers({
  socket: SocketReducer
});
