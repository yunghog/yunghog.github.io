import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeView } from 'src/views';
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeView />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
