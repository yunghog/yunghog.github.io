import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { HomeContainer } from 'src/containers';
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <HomeContainer />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
