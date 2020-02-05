import { RedisClient } from "redis";
import WebSocket, { Server } from "ws";
import uuid = require("uuid");
import { clientPromises, ClientPromises } from "./client_methods";
import { Poll, PollPayload } from "./types/poll_types";

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
      // Other options settable:
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

class WebSocketHandler {
  private wss: Server;
  private client: RedisClient;
  private promises: ClientPromises;
  constructor(wss: Server, client: RedisClient) {
    this.wss = wss;
    this.promises = clientPromises(client);
    this.client = client;
  }
  setHandlers() {
    this.wss.on("connection", socket => {
      socket.on("message", async (data: any) => {
        data = JSON.parse(data);
        console.log(data);
        switch (data.type) {
          case "create-poll":
            const newPoll = await this.createPoll(data.pollData);
            if (!newPoll) return;
            socket.send(JSON.stringify(newPoll));
        }
      });
    });
  }
  async createPoll(poll: Poll): Promise<PollPayload | null> {
    try {
      const id = uuid();
      const newPoll = {
        id,
        pollData: poll
      };
      await this.promises.setAsync(id, JSON.stringify(newPoll));
      return {
        type: "poll-data",
        ...newPoll
      };
    } catch (err) {
      console.log(err);
      return null;
    }
  }
  async getPoll(id: string): Promise<Poll | null> {
    try {
      const poll = await this.promises.getAsync(id);
      return JSON.parse(poll);
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}

export default WebSocketHandler;
