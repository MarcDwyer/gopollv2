import io from "socket.io";
import redisAdapter from "socket.io-redis";
import { setWsHandlers } from "./ws_handler";
import dotenv from "dotenv";
import RedisDb from "./redis_client";
import { createClient } from "redis";

dotenv.config();

const { DBHOST, DBPASS, PORT } = process.env;
console.log({ DBHOST, DBPASS });

export const RedisConfig = {
  port: 4200,
  host: DBHOST || "localhost",
  password: DBPASS
};

export const redisClient = new RedisDb(createClient(RedisConfig));

async function main() {
  const wss = io(PORT);
  wss.adapter(redisAdapter(RedisConfig));

  setWsHandlers(wss);
}

main();
