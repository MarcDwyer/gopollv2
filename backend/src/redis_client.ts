import { RedisClient } from "redis";
import { promisify } from "util";
import uuid from "uuid";

import { Poll, PollData } from "./types/poll_types";
import { structOptions } from "./poll_funcs";
import { IPSubField } from "./types/ip_field_types";

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

class RedisMethods {
  private client: RedisClient;
  public promises: ClientPromises;
  constructor(client: RedisClient) {
    this.client = client;
    this.promises = clientPromises(client);
  }
  async getAndParse(id: string): Promise<any> {
    const { getAsync } = this.promises;
    try {
      const str = await getAsync(id);
      return JSON.parse(str);
    } catch (err) {
      return null;
    }
  }
}

class RedisPolls extends RedisMethods {
  constructor(client: RedisClient) {
    super(client);
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

class RedisIps extends RedisMethods {
  constructor(client: RedisClient) {
    super(client);
  }
  async addIpField(poll_id: string) {
    const { setAsync } = this.promises;
    await setAsync(poll_id, JSON.stringify({}));
  }
  async addIpToField(poll_id: string, client_ip: string) {
    const { setAsync } = this.promises;
    const ipField: IPSubField = await this.getAndParse(poll_id);
    if (!ipField) {
      console.log("ipfield could not be found");
      return;
    }
    ipField[client_ip] = true;
    await setAsync(poll_id, JSON.stringify(ipField));
  }
  async checkIpField(poll_id: string, client_ip: string): Promise<boolean> {
    //@ts-ignore
    const ipField: IPSubField = this.getAndParse(poll_id);
    if (client_ip in ipField) {
      return true;
    }
    return false;
  }
}
export { RedisPolls, RedisIps };
