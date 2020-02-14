import { FCreatedPoll } from "../types/poll_types";

export const setLocalPoll = (poll: FCreatedPoll) => {
  const key = "created";
  let newCreated: FCreatedPoll[] = [];
  //@ts-ignore
  const created = JSON.parse(localStorage.getItem(key));
  if (created && Array.isArray(created)) {
    newCreated = [poll, ...created];
  } else {
    newCreated = [poll];
  }
  console.log(newCreated);
  localStorage.setItem(key, JSON.stringify(newCreated));
};
