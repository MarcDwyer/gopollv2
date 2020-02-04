import { Action } from "./reducers";

export type SocketState = null | SocketIOClient.Socket;

export const SET_SOCKET = Symbol();

const SocketReducers = (state = null, { payload, type }: Action) => {
  switch (type) {
    case SET_SOCKET:
      return payload;
    default:
      return state;
  }
};

export default SocketReducers;
