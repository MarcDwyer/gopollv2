import { Server } from "socket.io";
import { RedisClient } from "redis";
import uuid = require("uuid");

export const setPollCreator = (io: Server, client: RedisClient) => {
  io.on("create-poll", (poll: any) => {
    const id = uuid();
    console.log({ id, poll });
  });
};
