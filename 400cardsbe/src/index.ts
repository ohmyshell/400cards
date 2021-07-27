import { Server, Socket } from 'socket.io';
import { createServer, Server as httpServer } from 'http';
import { Room } from './room';
import { default as gameConfig } from './Config/config.json';

class App {
  PORT: string;
  ROOMS: Array<Room> = [];
  io: Server;
  server: httpServer;
  constructor() {
    this.initializeRooms();
    this.PORT = process.env.PORT ? process.env.PORT : '6969';
    this.server = createServer();
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
      },
    });
  }

  middleware(socket: Socket, next: Function) {
    const username: string = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    next();
  }

  pingEventHandler(socket: Socket) {
    socket.emit('pong');
  }

  reconnectEventHandler(id: string) {
    this.io.to(id).emit('rooms', this.ROOMS);
  }

  disconnectEventHandler(id: string, username: string) {
    this.ROOMS.forEach((room) => room.removePlayer(username));
    this.io.emit('rooms', this.ROOMS);
    console.log(
      `disconnected ${id}  ${username}
      Total Clients: ${this.io.engine.clientsCount}`
    );
  }

  roomEventHandler(roomName: string, socket: Socket, username: string) {
    socket.join(roomName);
    this.ROOMS.find((room: Room) => room.name === roomName)?.addPlayer(
      socket.id,
      username
    );
    this.io.emit('rooms', this.ROOMS);
  }

  startGameEventHandler(roomName: string) {
    let room: Room = this.ROOMS.find((room: Room) => room.name === roomName)!;
    try {
      room.startGame();
    } catch (error) {
      this.io.to(room.name).emit('gameError', error);
    }
    room.status = gameConfig.roomStatus.inProgress;
    room.getPlayersCards().forEach((player) => {
      const { id, cards } = player;
      this.io.to(id).emit('cards', cards);
    });
  }

  initializeRooms() {
    for (let i = 0; i < gameConfig.rooms.length; i++) {
      this.ROOMS.push(
        new Room(gameConfig.rooms[i].name, gameConfig.roomStatus.open)
      );
    }
  }

  run() {
    this.io.use(this.middleware);

    this.io.on('connection', (socket: Socket) => {
      const username = socket.handshake.auth.username;
      console.log(
        `connected ${username}${socket.id}
        Total Clients: ${this.io.engine.clientsCount}`
      );
      socket.emit('rooms', this.ROOMS);

      socket.on('ping', this.pingEventHandler);

      socket.on('reconnect', () => this.reconnectEventHandler(socket.id));

      socket.on('disconnect', () =>
        this.disconnectEventHandler(socket.id, username)
      );

      socket.on('room', (data) =>
        this.roomEventHandler(data, socket, username)
      );

      socket.on('startGame', (roomName) =>
        this.startGameEventHandler(roomName)
      );
    });

    this.server.listen(this.PORT);
    console.log(`running on port ${this.PORT}`);
  }
}

let tmpLog = console.log;
console.log = (msg) => {
  tmpLog(`[${new Date().toLocaleString()}] ${msg}`);
};

new App().run();
