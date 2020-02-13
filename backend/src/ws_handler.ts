import { Server } from "socket.io";
import {
  CREATE_POLL,
  GET_POLL,
  VOTE,
  REMOVE_ROOM
} from "./types/message_cases";
import createPoll from "./ws_events/create_poll";
import { IncPoll, VotePayload } from "./types/poll_types";
import getPoll from "./ws_events/get_poll";
import { castVote } from "./ws_events/vote";

export const setWsHandlers = (wss: Server) => {
  wss.on("connection", socket => {
    socket.on(CREATE_POLL, (poll: IncPoll) => createPoll(poll, socket));
    socket.on(GET_POLL, async (id: string) => getPoll(id, socket));

    socket.on(VOTE, async (vote: VotePayload) => castVote(vote, socket, wss));
    socket.on(REMOVE_ROOM, () => socket.leaveAll());
  });
};
