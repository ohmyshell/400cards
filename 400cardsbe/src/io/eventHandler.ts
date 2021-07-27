import { Server, Socket } from 'socket.io';
import { Room } from '../game/room';
import { Logger } from '../util/logger';

export class EventHandler {
  io: Server;
  constructor(io: Server) {
    this.io = io;
  }

  pingEventHandler(socket: Socket) {
    socket.emit('pong');
  }

  reconnectEventHandler(id: string, rooms: Room[]) {
    this.io.to(id).emit('rooms', rooms);
  }

  disconnectEventHandler(id: string, username: string, rooms: Room[]) {
    rooms.forEach((room) => room.removePlayer(username));
    this.io.emit('rooms', rooms);
    Logger.logEntry(username, id, this.io.engine.clientsCount, false);
  }

  roomEventHandler(
    roomName: string,
    socket: Socket,
    username: string,
    rooms: Room[]
  ) {
    socket.join(roomName);
    rooms
      .find((room: Room) => room.name === roomName)
      ?.addPlayer(socket.id, username);

    console.log(
      rooms.find((room: Room) => room.name === roomName),
      roomName,
      username
    );
    this.io.emit('rooms', rooms);
  }

  startGameEventHandler(roomName: string, rooms: Room[]) {
    let room: Room = rooms.find((room: Room) => room.name === roomName)!;
    try {
      room.startGame();
    } catch (error) {
      this.io.to(room.name).emit('gameError', error);
    }
    room.getPlayersCards().forEach((player) => {
      const { id, cards } = player;
      this.io.to(id).emit('cards', cards);
    });
  }
}
