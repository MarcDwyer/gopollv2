import redis from "redis";
import ws from "socket.io";
import { setPollCreator } from "./sockethandler";

// const dburl = `mongodb://${DBUSER}:${DBPASS}@${
//   ISDEV ? "localhost" : "mongodb"
// }:${process.env.MONGODBPORT || "27017"}`;
export const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};
async function main() {
  const io = ws(5000);
  const client = redis.createClient(RedisConfig);
  client.select(0);
  setPollCreator(io, client);
}

main();
