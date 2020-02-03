import Rooms from "./rooms";
import redis from "redis";
import { promisify } from "util";

import { getWsServer, setWs } from "./websockets";

// const dburl = `mongodb://${DBUSER}:${DBPASS}@${
//   ISDEV ? "localhost" : "mongodb"
// }:${process.env.MONGODBPORT || "27017"}`;
const redisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};

async function main() {
  const pub = redis.createClient(redisConfig);
  const sub = redis.createClient(redisConfig);
  const getAsync = promisify(pub.get).bind(pub);
  pub.select(0);
  pub.set("keytime", "hash val");
  const getData = await getAsync("keytime");
  console.log(getData);
  const wss = getWsServer();
  const rooms = new Rooms();
  setWs(wss, rooms, pub);
}

main();
