import { Socket } from "socket.io";
import { BERROR } from "../types/message_cases";

export const setErrorMsg = (socket: Socket) => (msg: string) =>
  socket.emit(BERROR, { error: msg });
