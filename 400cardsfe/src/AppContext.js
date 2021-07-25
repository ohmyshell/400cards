import React from 'react';
import { io } from 'socket.io-client';
import { useHistory } from 'react-router';

export const AppContext = React.createContext({});

export const Provider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState('');
  const [rooms, setRooms] = React.useState([]);
  const [currentRoom, setCurrentRoom] = React.useState({});
  const history = useHistory();

  const context = {
    socket,
    setSocket,
    username,
    setUsername,
    rooms,
    setRooms,
    currentRoom,
    setCurrentRoom,
  };

  React.useEffect(() => {
    setSocket(
      io('127.0.0.1:6969', {
        auth: { username },
        autoConnect: false,
      })
    );
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket.on('connect', () => {
        if (socket.connected) {
          history.push('/rooms');
        }
      });

      socket.on('rooms', (rooms) => {
        const tmpRoom = rooms.find(
          (room) => room.players.indexOf(username) > -1
        );
        setRooms(rooms);
        setCurrentRoom(tmpRoom);
      });
    }
  }, [socket?.connected]);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
