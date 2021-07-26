import React from 'react';
import AppContext from '../../AppContext';
import './index.css';

export default () => {
  const { ping } = React.useContext(AppContext);
  return <div className="Ping">Ping: {ping}</div>;
};
