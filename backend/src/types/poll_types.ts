export type Poll = {
  options: { [key: string]: Option };
  question: string;
  filterIps: boolean;
};

export type IncPoll = {
  options: string[];
  question: string;
  filterIps: boolean;
};

export type Option = {
  value: string;
  count: number;
};
export type PollData = {
  id: string;
  question: string;
  expiresIn: number;
  options: { [key: string]: Option };
  ipFilter: { [ip: string]: boolean } | null;
};

export type PollIDPayload = {
  id: string;
  type: string;
};

export interface VotePayload {
  id: string;
  option: string;
  filterIps: boolean;
}

export type TRedisPoll = {
  pollData: PollData;
  voted_ips: { [key: string]: boolean };
};

export type CustomError = {
  error: string;
};

export type FCreatedPoll = {
  question: string;
  poll_id: string;
  expiresin: string;
};
