import React from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router';

export const AppContext = React.createContext({});

export const Provider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [rooms, setRooms] = React.useState([]);
  const [currentRoom, setCurrentRoom] = React.useState({});
  const [ping, setPing] = React.useState(0);
  const [error, setError] = React.useState(0);
  const history = useHistory();
  const [gameState, setGameState] = React.useState({});
  let startTime;
  let interval = -1;
  let firstConnect = true;

  const configSocket = () => {
    socket.on('connect', () => {
      if (socket.connected && firstConnect) {
        history.push('/rooms');
        firstConnect = false;
      }
    });

    socket.io.on('reconnect', () => {
      socket.emit('reconnect', 0);
    });

    socket.on('rooms', (rooms) => {
      const tmpRoom = rooms?.filter(
        (room) =>
          room.players.filter((player) => player.name === username).length > 0
      );
      setRooms(rooms);
      setCurrentRoom(tmpRoom);
      console.log(tmpRoom);
    });

    socket.on('game', (game) => {
      setGameState(game);
    });

    socket.on('gameError', (err) => {
      setError(err);
    });

    if (interval > -1) clearInterval(interval);
    interval = setInterval(function () {
      startTime = Date.now();
      socket.emit('ping');
    }, 2000);

    socket.on('pong', function () {
      let latency = Date.now() - startTime;
      setPing(latency);
    });
  };
  const context = {
    socket,
    setSocket,
    username,
    setUsername,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
    error,
    setError,
    configSocket,
    ping,
    gameState,
  };

  React.useEffect(() => {
    setSocket(
      io('127.0.0.1:6969', {
        auth: { username },
        autoConnect: false,
      })
    );
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
