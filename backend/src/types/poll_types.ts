export type Poll = {
  options: { [key: string]: Option };
  question: string;
};

type Option = {
  value: string;
  count: number;
};
export type PollData = {
  id: string;
  question: string;
  options: { [key: string]: Option };
  type?: string;
};

export type PollIDPayload = {
  id: string;
  type: string;
};
