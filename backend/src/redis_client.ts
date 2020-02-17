import { RedisClient } from "redis";
import { promisify } from "util";

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
    return await delAsync(id);
  }
  async setData(id: string, data: any) {
    const { setAsync } = this.promises;
    await setAsync(id, JSON.stringify(data));
  }
}

export default RedisDb;
