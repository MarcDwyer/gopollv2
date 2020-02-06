import { Server } from "socket.io";
import { RedisClient } from "redis";

import { Poll } from "./types/poll_types";
import {
  CREATE_POLL,
  GET_POLL,
  POLL_ID,
  POLL_DATA
} from "./types/message_cases";

import RedisPolls from "./redis_client";
import Rooms from "./rooms";

export interface MySocket extends WebSocket {
  id?: string;
}
export const setWsHandlers = (wss: Server, client: RedisClient) => {
  const redisPolls = new RedisPolls(client);

  wss.on("connection", client => {
    client.on(CREATE_POLL, async (poll: Poll) => {
      const newID = await redisPolls.createPoll(poll);
      client.emit(POLL_ID, newID);
    });
    client.on(GET_POLL, async (id: string) => {
      console.log(id);
      const poll = await redisPolls.getPoll(id);
      client.emit(POLL_DATA, poll);
    });
  });
};
