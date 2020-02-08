export type FPoll = {
  options: { [key: string]: FOption };
  question: string;
};

type FOption = {
  value: string;
  count: number;
};
export type FPollData = {
  id: string;
  question: string;
  options: { [key: string]: FOption };
  type?: string;
};

export type FPollIDPayload = {
  id: string;
  type: string;
};

export type FErrorMessage = {
  error: string;
};
