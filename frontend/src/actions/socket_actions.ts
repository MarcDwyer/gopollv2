import { SET_SOCKET } from "../reducers/socket_reducer";

export const setSocket = (ws: WebSocket) => {
  return {
    type: SET_SOCKET,
    payload: ws
  };
};
