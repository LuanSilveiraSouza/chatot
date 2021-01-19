import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { Chat } from './pages/Chat';
import { Home } from './pages/Home';

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
        </Switch>
      </Router>
    </RecoilRoot>
  );
};

export default App;
