import io from "socket.io";
import redisAdapter from "socket.io-redis";
import { createClient } from "redis";

import { RedisPolls, RedisIps } from "./redis_client";
import { setWsHandlers } from "./ws_handler";
import dotenv from "dotenv";

dotenv.config();

const { DBHOST } = process.env;
console.log(DBHOST);
export const RedisConfig = {
  port: 4200,
  host: DBHOST || "localhost",
  password: process.env.DBUSER
};

function main() {
  const polls = new RedisPolls(createClient(RedisConfig));
  polls.selectDb(0);
  const ips = new RedisIps(createClient(RedisConfig));
  ips.selectDb(1);

  const wss = io(process.env.PORT);
  wss.adapter(redisAdapter(RedisConfig));

  setWsHandlers(wss, polls, ips);
}

main();
