import uuid = require("uuid");
import WebSocket, { Server } from "ws";

import { clientPromises } from "./redis_client";
import { Poll, PollData } from "./types/poll_types";
import { CREATE_POLL, GET_POLL, POLL_ID } from "./types/message_cases";
import { structOptions } from "./poll_funcs";
import { RedisClient } from "redis";

import Rooms from "./rooms";

export interface MySocket extends WebSocket {
  id?: string;
}

export const setWsHandlers = (wss: Server, client: RedisClient) => {
  const { setAsync, getAsync } = clientPromises(client);
  const rooms = new Rooms();

  wss.on("connection", (socket: MySocket) => {
    socket.id = uuid();
    socket.on("message", async (data: any) => {
      data = JSON.parse(data);
      console.log(data);
      switch (data.type) {
        case CREATE_POLL:
          const pollID = await createPoll(data.pollData, setAsync);
          if (!pollID) return;
          socket.send(
            JSON.stringify({
              type: POLL_ID,
              id: pollID
            })
          );
        case GET_POLL:
          const poll = getPoll(data.id, getAsync);
          socket.send(JSON.stringify(poll));
      }
    });
  });
};

const createPoll = async (
  poll: Poll,
  setAsync: Function
): Promise<string | null> => {
  try {
    const id = uuid();
    const opts = structOptions(poll);
    const newPoll: PollData = {
      id,
      question: poll.question,
      options: opts
    };
    console.log(newPoll);
    await setAsync(id, JSON.stringify(newPoll));
    return id;
  } catch (err) {
    console.log(err);
    return null;
  }
};

const getPoll = async (
  id: string,
  getAsync: Function
): Promise<Poll | null> => {
  try {
    const poll = await getAsync(id);
    return JSON.parse(poll);
  } catch (err) {
    console.log(err);
    return null;
  }
};
