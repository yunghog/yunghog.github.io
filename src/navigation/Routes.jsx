import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { Sidebar } from 'src/components';
import { AppFooter } from 'src/components/Footer';
import { HomeView } from 'src/views';
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Sidebar />
          <HomeView />
          <AppFooter />
        </Route>
      </Switch>
    </Router>
  );
};
export default AppRouter;
