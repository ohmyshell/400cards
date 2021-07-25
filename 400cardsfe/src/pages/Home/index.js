import React from 'react';
import './index.css';
import { AppContext } from '../../AppContext';
export const Home = () => {
  const { socket, username, setUsername } = React.useContext(AppContext);

  function connect() {
    socket.auth.username = username;
    socket.connect();
  }

  return (
    <div className="Home">
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
      />
      <button onClick={() => connect()}>Connect</button>
    </div>
  );
};
export default Home;
