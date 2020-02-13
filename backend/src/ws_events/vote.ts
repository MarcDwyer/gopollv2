import { VotePayload, PollData } from "../types/poll_types";
import { POLL_DATA } from "../types/message_cases";
import { redisClient } from "../main";
import { Socket } from "socket.io";
import { setErrorMsg } from "./repeated_evts";

export const castVote = async (
  vote: VotePayload,
  socket: Socket,
  wss: SocketIO.Server
) => {
  const { id, option } = vote;
  const sendError = setErrorMsg(socket);
  try {
    const poll: PollData = await redisClient.getAndParse(id);
    if (poll.ipFilter) {
      const client_ip = socket.handshake.headers["x-real-ip"] || "localhost";
      const didVote = checkIpField(poll, client_ip);
      if (didVote) {
        sendError("You've already voted");
        return;
      }
      poll.ipFilter[client_ip] = true;
    }
    const upvotedPoll = upvotePoll(poll, option);
    await redisClient.setData(upvotedPoll.id, upvotedPoll);
    //TODO: Should make a custom upvote event instead of sending entire poll
    wss.to(id).emit(POLL_DATA, upvotedPoll);
  } catch (err) {
    sendError("Error casting vote");
  }
};

const upvotePoll = (poll: PollData, option: string): PollData => {
  const copy = { ...poll };
  if (option in copy.options) {
    copy.options[option].count += 1;
  }
  return copy;
};

const checkIpField = (poll: PollData, client_ip: string) =>
  poll.ipFilter.hasOwnProperty(client_ip);
