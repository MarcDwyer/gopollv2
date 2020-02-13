import { RedisClient, createClient } from "redis";
import { promisify } from "util";
import { RedisConfig } from "./main";

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

class RedisDb {
  public promises: ClientPromises;
  constructor(client: RedisClient) {
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
    await this.promises.dbAsync(index);
    return this;
  }
  async delField(id: string) {
    const { delAsync } = this.promises;
    try {
      return await delAsync(id);
    } catch (err) {
      console.log(err);
    }
  }
  async setData(id: string, data: any) {
    const { setAsync } = this.promises;
    try {
      await setAsync(id, JSON.stringify(data));
    } catch (err) {
      console.log(err);
    }
  }
}

export default RedisDb;
