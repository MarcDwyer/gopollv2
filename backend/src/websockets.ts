import { Server } from "ws";
import uuid = require("uuid");
import WebSocket from "ws";
import { ClientPromises } from "./client_methods";
import { Poll, PollPayload, PollIDPayload } from "./types/poll_types";
import {
  POLL_DATA,
  CREATE_POLL,
  GET_POLL,
  POLL_ID
} from "./types/message_cases";
import Rooms from "./rooms";

export interface MySocket extends WebSocket {
  id?: string;
}

export const setHandlers = (
  wss: Server,
  { setAsync, getAsync }: ClientPromises
) => {
  wss.on("connection", (socket: MySocket) => {
    socket.id = uuid();

    socket.on("message", async (data: any) => {
      data = JSON.parse(data);
      console.log(data);
      switch (data.type) {
        case CREATE_POLL:
          const pollID = await createPoll(data.pollData, setAsync);
          if (!pollID) return;
          socket.send(JSON.stringify(pollID));
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
): Promise<PollIDPayload | null> => {
  try {
    const id = uuid();
    const newPoll = {
      id,
      pollData: poll
    };
    await setAsync(id, JSON.stringify(newPoll));
    return {
      type: POLL_ID,
      id
    };
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
