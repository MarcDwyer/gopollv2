import WebSocket from "ws";
import Room from "./rooms";
import { RedisClient } from "redis";

export const getWsServer = () => {
  return new WebSocket.Server({
    port: 5000,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024
      },
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024 // Size (in bytes) below which messages
      // should not be compressed.
    }
  });
};

export const setWs = (
  wss: WebSocket.Server,
  rooms: Room,
  client: RedisClient
) => {
  wss.on("connection", ws => {
    ws.send("You just connected");
    ws.on("message", (data: any) => {
      const msg = JSON.parse(data);
      console.log(msg);
      if (!msg.type) return;
      switch (msg.type) {
        default:
          console.log("banana");
      }
    });
  });
};
