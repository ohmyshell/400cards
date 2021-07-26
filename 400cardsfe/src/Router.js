import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Room from './pages/Game';
import AppContext, { Provider } from './AppContext';
import Toast from './components/Toast';
import Ping from './components/Ping';

function Router() {
  const { error } = React.useContext(AppContext);
  return (
    <MemoryRouter>
      <Provider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/room/:roomname" component={Room} />
        </Switch>
        <Toast />
        <Ping />
      </Provider>
    </MemoryRouter>
  );
}

export default Router;
