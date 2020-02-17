import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './Header';
import Feed from './Feed';
import CreateLink from './CreateLink';

const App = () => (
  <div className="center w85">
    <Header />
    <div className="ph3 pv1 background-gray">
      <Switch>
        <Route exact path="/" component={Feed} />
        <Route exact path="/submit" component={CreateLink} />
      </Switch>
    </div>
  </div>
);

export default App;
