export type IPField = {
  [poll_id: string]: IPSubField;
};

export type IPSubField = {
  [ip: string]: boolean;
};
