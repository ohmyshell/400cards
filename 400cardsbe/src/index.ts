import { Server, Socket } from 'socket.io';
import { createServer, Server as httpServer } from 'http';
import { Room } from './game/room';
import { default as gameConfig } from './cfg/config.json';
import { Logger } from './util/logger';
import { EventHandler } from './io/eventHandler';

class App {
  PORT: string;
  ROOMS: Array<Room> = [];
  io: Server;
  server: httpServer;
  eventHandler: EventHandler;
  constructor() {
    this.PORT = process.env.PORT ? process.env.PORT : '6969';
    this.server = createServer();
    this.io = new Server(this.server, {
      cors: {
        origin: '*',
      },
    });
    this.eventHandler = new EventHandler(this.io);
    //init rooms using room names
    for (let i = 0; i < gameConfig.roomCount; i++) {
      this.ROOMS.push(new Room(gameConfig.roomNames[i]));
    }
  }

  middleware(socket: Socket, next: Function) {
    const username: string = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    next();
  }

  run() {
    this.io.use(this.middleware);
    
    this.io.on('connection', (socket: Socket) => {
      const username = socket.handshake.auth.username;

      Logger.logEntry(socket.id, this.io.engine.clientsCount, username, true);

      socket.emit('rooms', this.ROOMS);

      socket.on('ping', () => this.eventHandler.pingEventHandler(socket));

      socket.on('reconnect', () =>
        this.eventHandler.reconnectEventHandler(socket.id, this.ROOMS)
      );

      socket.on('disconnect', () =>
        this.eventHandler.disconnectEventHandler(
          socket.id,
          username,
          this.ROOMS
        )
      );

      socket.on('room', (data) =>
        this.eventHandler.roomEventHandler(data, socket, username, this.ROOMS)
      );

      socket.on('startGame', (roomName) =>
        this.eventHandler.startGameEventHandler(roomName, this.ROOMS)
      );
    });

    this.server.listen(this.PORT);
    Logger.log(`running on port ${this.PORT}`);
  }
}

new App().run();
