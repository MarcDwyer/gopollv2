import redis from "redis";
import { Server } from "ws";
import { setHandlers } from "./websockets";
import { promisify } from "util";
import { clientPromises } from "./client_methods";

export const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};
const getWsServer = () => {
  return new Server({
    port: 5000,
    perMessageDeflate: {
      zlibDeflateOptions: {
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      clientNoContextTakeover: true,
      serverNoContextTakeover: true,
      serverMaxWindowBits: 10,
      concurrencyLimit: 10,
      threshold: 1024
    }
  });
};

async function main() {
  const wss = getWsServer();
  const client = redis.createClient(RedisConfig);
  const promises = clientPromises(client);
  setHandlers(wss, promises);
  client.select(0);
}

main();
