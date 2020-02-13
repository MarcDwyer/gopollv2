import valid from "uuid-validate";
import { POLL_DATA } from "../types/message_cases";
import { redisClient } from "../main";
import { setErrorMsg } from "./repeated_evts";
import { PollData } from "../types/poll_types";

const getPoll = async (poll_id: string, socket: SocketIO.Socket) => {
  const sendError = setErrorMsg(socket);
  if (!valid(poll_id)) {
    sendError("Not a valid Poll ID");
    return;
  }
  const poll: PollData = await redisClient.getAndParse(poll_id);
  if (!poll) {
    sendError("Poll does not exist");
    return;
  }
  socket.join(poll.id);
  socket.emit(POLL_DATA, poll);
};

export default getPoll;
