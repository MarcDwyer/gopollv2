import Hub from "./hub";
import { getWsServer, setWs } from "./websockets";

function main() {
  const wss = getWsServer();
  const hub = new Hub();
  setWs(wss, hub);
}

main();
