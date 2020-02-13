import { redisClient } from "../main";
import { structPoll } from "../poll_methods/structure_poll";
import { IncPoll } from "../types/poll_types";
import { POLL_ID } from "../types/message_cases";

export default async function createPoll(
  poll: IncPoll,
  socket: SocketIO.Socket
): Promise<void> {
  const newPoll = structPoll(poll);
  console.log(newPoll);
  await redisClient.setData(newPoll.id, newPoll);
  deletePoll(newPoll.id);
  socket.emit(POLL_ID, newPoll.id);
}

const deletePoll = (poll_id: string, time: number = 60000 * 60 * 6) => {
  const timer = setTimeout(() => redisClient.promises.delAsync(poll_id), time);
  return timer;
};
