import { Server } from "ws";
import Rooms from "./rooms";
import { setWsHandlers } from "./ws_handler";
import { createClient } from "redis";

const wss = new Server({
  port: 5000,
  perMessageDeflate: {
    zlibDeflateOptions: {
      chunkSize: 1024,
      memLevel: 7,
      level: 3
    },
    zlibInflateOptions: {
      chunkSize: 10 * 1024
    },
    clientNoContextTakeover: true,
    serverNoContextTakeover: true,
    serverMaxWindowBits: 10,
    concurrencyLimit: 10,
    threshold: 1024
  }
});
const RedisConfig = {
  port: 4200,
  host: "localhost",
  password: "ihmc_sucks"
};

async function main() {
  const client = createClient(RedisConfig);
  setWsHandlers(wss, client);
}

main();
