import React from 'react';
import AppContext from '../../AppContext';
import './index.css';

const Toast = () => {
  const { error } = React.useContext(AppContext);
  const [showing, setShowing] = React.useState(false);
  let timeout = -1;

  React.useEffect(() => {
    if (error) {
      setShowing(true);
      if (timeout > -1) clearTimeout(timeout);
      setTimeout(() => {
        setShowing(false);
      }, 3000);
    }
  }, [error]);
  return <div className={showing ? 'Toast show' : 'Toast'}>{error}</div>;
};

export default Toast;
