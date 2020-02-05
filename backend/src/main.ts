import redis from "redis";
import WebSocketHandler, { getWsServer } from "./websockets";
import { promisify } from "util";

// const dburl = `mongodb://${DBUSER}:${DBPASS}@${
//   ISDEV ? "localhost" : "mongodb"
// }:${process.env.MONGODBPORT || "27017"}`;
export const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};
async function main() {
  const wss = getWsServer();
  const client = redis.createClient(RedisConfig);
  client.select(0);
  const wsHandler = new WebSocketHandler(wss, client);
  wsHandler.setHandlers();
}

main();
