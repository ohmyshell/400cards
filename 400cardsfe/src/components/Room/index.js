import './index.css';

const Room = ({ name, players, emit }) => {
  return (
    <div className="Room" onClick={() => emit(name)}>
      <h3>{name}</h3>
      {players.map((player, idx) => {
        return <p key={idx}>{player.name}</p>;
      })}
    </div>
  );
};

export default Room;
