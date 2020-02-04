import io from "socket.io-client";
import { SET_SOCKET } from "../reducers/socket_reducer";

export const setSocket = () => {
  const socket = io("http://localhost:5000");
  return {
    type: SET_SOCKET,
    payload: socket
  };
};
