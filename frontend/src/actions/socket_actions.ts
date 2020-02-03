import { SET_SOCKET } from "../reducers/socket_reducer";

export const setSocket = (url: string) => {
  const socket = new WebSocket(url);
  socket.addEventListener("message", msg => {
    console.log(msg.data);
    socket.send("yeah thanks bro");
  });
  return {
    type: SET_SOCKET,
    payload: socket
  };
};
