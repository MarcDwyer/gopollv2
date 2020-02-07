import { RedisClient } from "redis";
import { promisify } from "util";
import uuid from "uuid";

import { Poll, PollData } from "./types/poll_types";
import { structOptions } from "./poll_funcs";

export type ClientPromises = {
  getAsync(id: string): Promise<string>;
  setAsync(id: string, data: string): Promise<boolean>;
  delAsync(id: string | string[]): Promise<string>;
};

const clientPromises = (client: RedisClient): ClientPromises => {
  return {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    delAsync: promisify(client.del).bind(client)
  };
};

class RedisPolls {
  private client: RedisClient;
  public promises: ClientPromises;
  constructor(client: RedisClient) {
    this.client = client;
    this.promises = clientPromises(client);
  }
  async createPoll(poll: Poll) {
    const { setAsync } = this.promises;
    try {
      const id = uuid();
      const opts = structOptions(poll);
      const newPoll: PollData = {
        id,
        question: poll.question,
        options: opts
      };
      console.log(newPoll);
      await setAsync(id, JSON.stringify(newPoll));
      return id;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getPoll(id: string): Promise<PollData> {
    const { getAsync } = this.promises;
    try {
      const poll = await getAsync(id);
      return JSON.parse(poll);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
export default RedisPolls;
