import React from 'react';
import './index.css';

export default ({ msg, showing }) => {
  return <div className={showing ? 'Toast show' : 'Toast'}>{msg}</div>;
};
