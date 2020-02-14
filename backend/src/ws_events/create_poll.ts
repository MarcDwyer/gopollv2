import { redisClient } from "../main";
import { structPoll } from "../poll_methods/structure_poll";
import { IncPoll } from "../types/poll_types";
import { CREATED_POLL } from "../types/message_cases";

export default async function createPoll(
  poll: IncPoll,
  socket: SocketIO.Socket
): Promise<void> {
  const [delTime, newPoll] = structPoll(poll);

  await redisClient.setData(newPoll.id, newPoll);

  deleteAfterTime(newPoll.id, delTime);

  socket.emit(CREATED_POLL, {
    poll_id: newPoll.id,
    question: newPoll.question,
    expiresIn: newPoll.expiresIn
  });
}

const deleteAfterTime = (poll_id: string, time: number) =>
  setTimeout(() => redisClient.promises.delAsync(poll_id), time);
