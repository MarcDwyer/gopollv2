import { RedisClient, createClient } from "redis";
import { promisify } from "util";

export type ClientPromises = {
  getAsync(id: string): Promise<string>;
  setAsync(id: string, data: string): Promise<boolean>;
};

export const clientPromises = (client: RedisClient): ClientPromises => {
  return {
    getAsync: promisify(client.get).bind(client),
    setAsync: promisify(client.set).bind(client)
  };
};

export default createClient(RedisConfig);
