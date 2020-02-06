import { SET_SOCKET } from "../reducers/socket_reducer";

export const setSocket = (ws: SocketIOClient.Socket) => {
  return {
    type: SET_SOCKET,
    payload: ws
  };
};
