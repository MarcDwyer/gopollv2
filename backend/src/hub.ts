import WebSocket from "ws";

type MyHub = {
  [room_id: string]: { [socket_id: string]: WebSocket };
};

class Hub {
  public hub: MyHub;
  constructor() {
    this.hub = {};
  }
  addToRoom(room_id: string, socket_id: string, ws: WebSocket) {
    if (!(room_id in this.hub)) {
      this.hub[room_id] = {};
    }
    this.hub[room_id][socket_id] = ws;
  }
  removeFromRoom(room_id: string, socket_id: string) {
    delete this.hub[room_id][socket_id];
  }
  broadCastRoom(room_id: string, msg: any) {
    const sockets = Object.values(this.hub[room_id]);
    if (sockets.length) {
      for (const socket of sockets) {
        socket.send(JSON.stringify(msg));
      }
    }
  }
}

export default Hub;
