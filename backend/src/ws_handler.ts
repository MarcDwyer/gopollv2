import { Server } from "socket.io";
import { createClient } from "redis";

import { Poll, VotePayload, PollData } from "./types/poll_types";
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
  polls: RedisPolls,
  ips: RedisIps
) => {
  wss.on("connection", client => {
    client.on(CREATE_POLL, async (poll: Poll) => {
      const newID = await polls.createPoll(poll);
      await ips.createIpField(newID);
      client.emit(POLL_ID, newID);
    });
    client.on(GET_POLL, async (id: string) => {
      if (!validate(id)) {
        client.emit(BERROR, { error: "Not a valid uuid" });
        return;
      }
      const poll: PollData = await polls.getAndParse(id);
      console.log(poll);
      client.join(poll.id);
      client.emit(POLL_DATA, poll);
    });
    client.on(VOTE, async (vote: VotePayload) => {
      const { id, option } = vote;
      const client_ip = client.request.connection.remoteAddress;
      console.log(client_ip);
      const didVote = await ips.checkIpField(id, client_ip);
      console.log(didVote);
      if (didVote) {
        console.log("you voted dude");
        client.emit(BERROR, { error: "You already voted" });
      } else {
        console.log("didnt vote yet");
        const newPoll = await polls.castVote(id, option);
        await ips.addIpToField(vote.id, client_ip);
        wss.to(newPoll.id).emit(POLL_DATA, newPoll);
      }
    });
  });
};
