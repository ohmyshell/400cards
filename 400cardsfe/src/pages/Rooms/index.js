import './index.css';
import Room from '../../components/Room';
import React from 'react';
import AppContext from '../../AppContext';
import { useHistory } from 'react-router-dom';

const Rooms = () => {
  const { socket, rooms } = React.useContext(AppContext);
  const history = useHistory();

  return (
    <div className="Rooms">
      {rooms.map((room, idx) => (
        <Room
          key={idx}
          name={room.name}
          players={room.players}
          emit={() => {
            socket.emit('room', room.name);
            history.push('/room/' + room.name);
          }}
        />
      ))}
    </div>
  );
};

export default Rooms;
