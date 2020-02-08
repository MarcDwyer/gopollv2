import { setWsHandlers } from "./ws_handler";
import io from "socket.io";
import redisAdapter from "socket.io-redis";
import { createClient } from "redis";
import { RedisPolls, RedisIps } from "./redis_client";

export const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};

async function main() {
  const polls = new RedisPolls(createClient(RedisConfig));
  polls.selectDb(0);
  const ips = new RedisIps(createClient(RedisConfig));
  ips.selectDb(1);

  const wss = io(process.env.PORT || 5000);
  wss.adapter(redisAdapter(RedisConfig));

  setWsHandlers(wss, polls, ips);
}

main();
