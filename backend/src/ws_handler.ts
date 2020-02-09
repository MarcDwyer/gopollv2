import { Server } from "socket.io";
import { createClient } from "redis";

import { Poll, VotePayload, PollData, IncPoll } from "./types/poll_types";
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
    client.on(CREATE_POLL, async (poll: IncPoll) => {
      console.log(poll);
      const { filterIps, id } = await polls.createPoll(poll);
      if (filterIps) {
        await ips.createIpField(id);
      }
      client.emit(POLL_ID, id);
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
      const { id, option, filterIps } = vote;
      const client_ip = client.request.connection.remoteAddress;
      let canVote = true;
      if (filterIps) {
        canVote = await ips.checkIpField(vote.id, client_ip);
        if (canVote) await ips.addIpToField(vote.id, client_ip);
      }
      if (!canVote) {
        console.log("you voted dude");
        client.emit(BERROR, { error: "You already voted" });
      } else {
        console.log("didnt vote yet");
        const newPoll = await polls.castVote(id, option);
        wss.to(newPoll.id).emit(POLL_DATA, newPoll);
      }
    });
  });
};
