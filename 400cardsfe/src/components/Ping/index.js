import React from 'react';
import AppContext from '../../AppContext';
import './index.css';

const Ping = () => {
  const { ping } = React.useContext(AppContext);
  return <div className="Ping">Ping: {ping}ms</div>;
};

export default Ping;
