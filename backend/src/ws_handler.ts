import { Server } from "socket.io";
import { RedisClient } from "redis";

import { Poll, VotePayload } from "./types/poll_types";
import {
  CREATE_POLL,
  GET_POLL,
  POLL_ID,
  POLL_DATA,
  BERROR,
  VOTE
} from "./types/message_cases";
import validate from "uuid-validate";

import { RedisPolls, RedisIps } from "./redis_client";

export const setWsHandlers = (
  wss: Server,
  pollClient: RedisClient,
  ipClient: RedisClient
) => {
  const polls = new RedisPolls(pollClient);
  const ips = new RedisIps(ipClient);

  wss.on("connection", client => {
    client.on(CREATE_POLL, async (poll: Poll) => {
      const newID = await polls.createPoll(poll);
      client.emit(POLL_ID, newID);
    });
    client.on(GET_POLL, async (id: string) => {
      if (!validate(id)) {
        client.emit(BERROR, { error: "Not a valid uuid" });
        return;
      }
      const poll = await polls.getPoll(id);
      client.join(poll.id);
      client.emit(POLL_DATA, poll);
    });
    client.on(VOTE, async (vote: VotePayload) => {
      const { setAsync } = polls.promises;
      const modifyPoll = await polls.getPoll(vote.id);
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
