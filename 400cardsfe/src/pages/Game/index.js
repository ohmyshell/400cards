import React from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../AppContext';
import './index.css';

const Game = () => {
  const params = useParams();
  const { currentRoom, socket } = React.useContext(AppContext);

  return (
    <div className="Game">
      <h3>Room: {params.roomname}</h3>
      {currentRoom?.players?.map((player, idx) => (
        <p key={idx}>
          <strong>Player {idx + 1}:</strong> {player.name}
        </p>
      ))}
      <button
        disabled={currentRoom?.players?.length !== 4}
        onClick={() => {
          socket.emit('startGame', currentRoom.name);
        }}
      >
        Start
      </button>
    </div>
  );
};

export default Game;
