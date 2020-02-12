import io from "socket.io";
import redisAdapter from "socket.io-redis";
import { createClient } from "redis";

import { RedisPolls, RedisIps } from "./redis_client";
import { setWsHandlers } from "./ws_handler";
import dotenv from "dotenv";

dotenv.config();

const { DBHOST, DBPASS, PORT } = process.env;
console.log({ DBHOST, DBPASS });

export const RedisConfig = {
  port: 4200,
  host: DBHOST || "localhost",
  password: DBPASS
};

async function main() {
  const polls = new RedisPolls(createClient(RedisConfig));
  await polls.selectDb(0);
  const ips = new RedisIps(createClient(RedisConfig));
  await ips.selectDb(1);

  const wss = io(PORT);
  wss.adapter(redisAdapter(RedisConfig));

  setWsHandlers(wss, polls, ips);
}

main();
