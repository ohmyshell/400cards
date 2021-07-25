import React from 'react';
import { MemoryRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import Room from './pages/Game';
import { Provider } from './AppContext';
import Toast from './components/Toast';

function Router() {
  return (
    <MemoryRouter>
      <Provider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms" component={Rooms} />
          <Route path="/room/:roomname" component={Room} />
        </Switch>
        <Toast msg="asdasd" />
      </Provider>
    </MemoryRouter>
  );
}

export default Router;
