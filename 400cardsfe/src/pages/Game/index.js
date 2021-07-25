import React from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../../AppContext';

export default () => {
  const params = useParams();
  const { currentRoom } = React.useContext(AppContext);

  return (
    <div className="Game">
      {currentRoom?.players.map((player, idx) => (
        <p key={idx}>{player}</p>
      ))}
      {params.roomname}
    </div>
  );
};
