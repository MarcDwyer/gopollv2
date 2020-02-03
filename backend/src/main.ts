import Rooms from "./rooms";
import redis from "redis";
import { promisify } from "util";

import { getWsServer, setWs } from "./websockets";

// const dburl = `mongodb://${DBUSER}:${DBPASS}@${
//   ISDEV ? "localhost" : "mongodb"
// }:${process.env.MONGODBPORT || "27017"}`;

async function main() {
  const client = redis.createClient({
    port: 4200,
    host: "localhost",
    password: "ihmc_sucks"
  });
  const getAsync = promisify(client.get).bind(client);
  client.select(0);
  client.set("keytime", "hash val");
  const getData = await getAsync("keytime");
  console.log(getData);
  const wss = getWsServer();
  const rooms = new Rooms();
  setWs(wss, rooms);
}

main();
