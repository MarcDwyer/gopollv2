import WebSocket from "ws";

type MyRooms = {
  [room_id: string]: { [socket_id: string]: WebSocket };
};

class Rooms {
  public rooms: MyRooms;
  constructor() {
    this.rooms = {};
  }
  addToRoom(room_id: string, socket_id: string, ws: WebSocket) {
    if (!(room_id in this.rooms)) {
      this.rooms[room_id] = {};
    }
    this.rooms[room_id][socket_id] = ws;
  }
  removeFromRoom(room_id: string, socket_id: string) {
    delete this.rooms[room_id][socket_id];
  }
  broadCastRoom(room_id: string, msg: any) {
    const sockets = Object.values(this.rooms[room_id]);
    if (sockets.length) {
      for (const socket of sockets) {
        socket.send(JSON.stringify(msg));
      }
    }
  }
}

export default new Rooms();
