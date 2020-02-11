import { RedisClient } from "redis";
import { promisify } from "util";
import uuid from "uuid";

import { PollData, IncPoll } from "./types/poll_types";
import { IPSubField } from "./types/ip_field_types";
import { structPoll } from "./structure_poll";

export type ClientPromises = {
  getAsync(id: string): Promise<string>;
  setAsync(id: string, data: string): Promise<boolean>;
  delAsync(id: string | string[]): Promise<string>;
  dbAsync(index: number): Promise<boolean>;
};

const clientPromises = (client: RedisClient): ClientPromises => {
  return {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client),
    delAsync: promisify(client.del).bind(client),
    dbAsync: promisify(client.select).bind(client)
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
  async selectDb(index: number) {
    return await this.promises.dbAsync(index);
  }
  async delField(id: string) {
    const { delAsync } = this.promises;
    try {
      return await delAsync(id);
    } catch (err) {
      console.log(err);
    }
  }
}

class RedisPolls extends RedisMethods {
  constructor(client: RedisClient) {
    super(client);
  }
  async createPoll(poll: IncPoll): Promise<PollData | null> {
    const { setAsync } = this.promises;
    try {
      const id = uuid();
      const newpoll: PollData = { ...structPoll(poll), id };
      await setAsync(id, JSON.stringify(newpoll));
      return newpoll;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async castVote(poll_id: string, option: string): Promise<PollData> {
    const { setAsync } = this.promises;
    try {
      const poll: PollData = await this.getAndParse(poll_id);
      if (option in poll.options) {
        poll.options[option].count += 1;
      }
      await setAsync(poll_id, JSON.stringify(poll));
      return poll;
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
  async createIpField(poll_id: string) {
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
    console.log(ipField);
    await setAsync(poll_id, JSON.stringify(ipField));
  }
  async checkIpField(poll_id: string, client_ip: string): Promise<boolean> {
    //@ts-ignore
    const ipField: IPSubField = await this.getAndParse(poll_id);
    if (client_ip in ipField) {
      return false;
    }
    return true;
  }
}
export { RedisPolls, RedisIps };
