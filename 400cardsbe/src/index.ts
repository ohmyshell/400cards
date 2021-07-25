import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import { Room } from './room';
import { default as gameConfig } from './Config/config.json';
class App {
  PORT: string;
  ROOMS: Array<Room> = [];
  constructor() {
    this.initializeRooms();
    this.PORT = process.env.PORT ? process.env.PORT : '6969';
    this.run();
  }

  run() {
    const server = createServer();
    const io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    io.use((socket: Socket, next: Function) => {
      const username = socket.handshake.auth.username;
      if (!username) {
        return next(new Error('invalid username'));
      }
      next();
    });

    io.on('connection', (socket: Socket) => {
      console.log(
        `[${new Date().toLocaleString()}] connected ${socket.id}  ${
          socket.handshake.auth.username
        } Total Clients: ${io.engine.clientsCount}`
      );

      socket.on('ping', function () {
        socket.emit('pong');
      });

      socket.emit('rooms', this.ROOMS);

      socket.on('disconnect', () => {
        const playerRoom = this.ROOMS.find((room: Room) =>
          room.players.includes(socket.handshake.auth.username)
        );
        playerRoom?.players.splice(
          playerRoom.players.indexOf(socket.handshake.auth.username),
          1
        );
        io.emit('rooms', this.ROOMS);
        console.log(
          `[${new Date().toLocaleString()}] disconnected ${socket.id}  ${
            socket.handshake.auth.username
          } Total Clients: ${io.engine.clientsCount}`
        );
      });

      socket.on('room', (data) => {
        socket.join(data);
        this.ROOMS.find((room: Room) => room.name === data)?.players.push(
          socket.handshake.auth.username
        );
        io.emit('rooms', this.ROOMS);
      });
    });

    io.on('card', (socket: Socket) => {
      console.log(socket);
    });

    server.listen(this.PORT);
    console.log(
      `[${new Date().toLocaleString()}] running on port ${this.PORT}`
    );
  }
  initializeRooms() {
    for (let i = 0; i < gameConfig.rooms.length; i++) {
      this.ROOMS.push(
        new Room(gameConfig.rooms[i].name, gameConfig.roomStatus.open, [])
      );
    }
  }
}
new App();
