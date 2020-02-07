import { setWsHandlers } from "./ws_handler";
import { createClient } from "redis";
import io from "socket.io";
import redisAdapter from "socket.io-redis";

const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};

async function main() {
  const wss = io(process.env.PORT || 5000);
  wss.adapter(redisAdapter(RedisConfig));
  const client = createClient(RedisConfig);
  setWsHandlers(wss, client);
}

main();
