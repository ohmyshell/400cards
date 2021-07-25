import React from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../AppContext';
import './index.css';

export default () => {
  const params = useParams();
  const { currentRoom, socket } = React.useContext(AppContext);

  return (
    <div className="Game">
      {currentRoom?.players.map((player, idx) => (
        <p key={idx}>{player}</p>
      ))}
      {params.roomname}
      <button
        onClick={() => {
          socket.emit('startGame', currentRoom.name);
        }}
      >
        Start
      </button>
    </div>
  );
};
