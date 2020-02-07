import { Server } from "socket.io";
import { RedisClient } from "redis";

import { Poll, VotePayload } from "./types/poll_types";
import {
  CREATE_POLL,
  GET_POLL,
  POLL_ID,
  POLL_DATA,
  VOTE
} from "./types/message_cases";

import RedisPolls from "./redis_client";

export interface MySocket extends WebSocket {
  id?: string;
}
export const setWsHandlers = (wss: Server, client: RedisClient) => {
  const redisMethods = new RedisPolls(client);

  wss.on("connection", client => {
    client.on(CREATE_POLL, async (poll: Poll) => {
      const newID = await redisMethods.createPoll(poll);
      client.emit(POLL_ID, newID);
    });
    client.on(GET_POLL, async (id: string) => {
      const poll = await redisMethods.getPoll(id);
      client.join(poll.id);
      client.emit(POLL_DATA, poll);
    });
    client.on(VOTE, async (vote: VotePayload) => {
      const { setAsync } = redisMethods.promises;
      const modifyPoll = await redisMethods.getPoll(vote.id);
      if (vote.option in modifyPoll.options) {
        modifyPoll.options[vote.option].count += 1;
      }
      console.log(modifyPoll);
      const isSet = await setAsync(modifyPoll.id, JSON.stringify(modifyPoll));
      if (isSet) {
        wss.to(modifyPoll.id).emit(POLL_DATA, modifyPoll);
      }
    });
  });
};
