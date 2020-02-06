import { setWsHandlers } from "./ws_handler";
import { createClient } from "redis";
import io from "socket.io";

const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};

async function main() {
  const wss = io(5000);
  const client = createClient(RedisConfig);
  setWsHandlers(wss, client);
}

main();
