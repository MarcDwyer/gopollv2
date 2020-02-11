import { Server } from "socket.io";

import { VotePayload, PollData, IncPoll } from "./types/poll_types";
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
      const { filterIps, id } = await polls.createPoll(poll);
      if (filterIps) {
        await ips.createIpField(id);
      }
      client.emit(POLL_ID, id);
      setTimeout(() => {
        if (filterIps) ips.delField(id);
        polls.delField(id);
      }, 60000 * 60 * 4);
    });
    client.on(GET_POLL, async (id: string) => {
      if (!validate(id)) {
        client.emit(BERROR, { error: "Not a valid uuid" });
        return;
      }
      const poll: PollData = await polls.getAndParse(id);
      if (!poll) {
        client.emit(BERROR, { error: "Poll does not exist" });
        return;
      }
      client.join(poll.id);
      client.emit(POLL_DATA, poll);
    });
    client.on(VOTE, async (vote: VotePayload) => {
      const { id, option, filterIps } = vote;

      let canVote = true;
      const client_ip: string =
        client.handshake.headers["x-real-ip"] || "localhost";

      if (filterIps) {
        canVote = await ips.checkIpField(id, client_ip);
      }
      if (canVote) {
        const newPoll = await polls.castVote(id, option);
        if (filterIps) ips.addIpToField(id, client_ip);
        wss.to(id).emit(POLL_DATA, newPoll);
      } else {
        client.emit(BERROR, { error: "You already voted" });
      }
    });
  });
};
