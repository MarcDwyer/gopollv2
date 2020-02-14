export type FPoll = {
  options: string[];
  question: string;
  filterIps: boolean;
};

type FOption = {
  value: string;
  count: number;
};
export type FPollData = {
  id: string;
  question: string;
  options: { [key: string]: FOption };
  filterIps: boolean;
};

export type FPollIDPayload = {
  id: string;
  type: string;
};

export type FErrorMessage = {
  error: string;
};

export type FCreatedPoll = {
  question: string;
  poll_id: string;
  expiresIn: number;
};
