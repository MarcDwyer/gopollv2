export type Poll = {
  [key: string]: string;
  question: string;
};

export type PollPayload = {
  id: string;
  pollData: Poll;
  type: string;
};
