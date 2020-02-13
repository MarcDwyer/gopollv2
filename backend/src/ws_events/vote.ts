import { VotePayload, PollData } from "../types/poll_types";
import { POLL_DATA } from "../types/message_cases";
import { redisClient } from "../main";
import { Socket } from "socket.io";
import { setErrorMsg } from "../ws_handler";

export const castVote = async (
  vote: VotePayload,
  socket: Socket,
  wss: SocketIO.Server
) => {
  const { id, option } = vote;
  const sendError = setErrorMsg(socket);
  try {
    const poll: PollData = await redisClient.getAndParse(id);
    const [didVote, client_ip] = checkIfVoted(socket, poll);
    console.log(didVote);
    if (didVote) {
      sendError("You've already voted");
      return;
    }
    const upvotedPoll = upvotePoll(poll, option, client_ip);
    await redisClient.setData(upvotedPoll.id, upvotedPoll);
    //TODO: Should make a custom upvote event instead of sending entire poll
    wss.to(id).emit(POLL_DATA, upvotedPoll);
  } catch (err) {
    sendError("Error casting vote");
  }
};

const upvotePoll = (
  poll: PollData,
  option: string,
  client_ip: string
): PollData => {
  const copy = { ...poll };
  if (option in copy.options) {
    copy.options[option].count += 1;
  }
  copy.ipFilter[client_ip] = true;
  return copy;
};
const checkIfVoted = (socket: Socket, poll: PollData): [boolean, string] => {
  let didVote = false;
  let client_ip = socket.handshake.headers["x-real-ip"] || "localhost";
  if (poll.ipFilter) {
    console.log(poll.ipFilter);
    didVote = checkIpField(poll, client_ip);
  }
  return [didVote, client_ip];
};

const checkIpField = (poll: PollData, client_ip: string) =>
  poll.ipFilter.hasOwnProperty(client_ip);
