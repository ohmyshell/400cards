import React from "react";
import { io } from "socket.io-client";
import { useHistory } from "react-router";

export const AppContext = React.createContext({});

export const Provider = ({ children }) => {
  const [socket, setSocket] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [rooms, setRooms] = React.useState([]);
  const [currentRoom, setCurrentRoom] = React.useState({});
  const [ping, setPing] = React.useState(0);
  const [error, setError] = React.useState(0);
  const history = useHistory();
  let interval = -1;

  const configSocket = () => {
    socket.on("connect", () => {
      if (socket.connected) {
        history.push("/rooms");
      }
    });

    socket.on("rooms", (rooms) => {
      const tmpRoom = rooms.find((room) => room.players.indexOf(username) > -1);
      setRooms(rooms);
      setCurrentRoom(tmpRoom);
    });

    socket.on("game", (game) => {
      console.log(game);
    });

    socket.on("gameError", (err) => {
      setError(err);
    });

    let startTime;
    if (interval > -1) clearInterval(interval);
    interval = setInterval(function () {
      startTime = Date.now();
      socket.emit("ping");
    }, 2000);

    socket.on("pong", function () {
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
  };

  React.useEffect(() => {
    setSocket(
      io("127.0.0.1:6969", {
        auth: { username },
        autoConnect: false,
      })
    );
  }, []);

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
};

export default AppContext;
