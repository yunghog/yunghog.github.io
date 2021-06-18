import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Home from './pages/home';


class App extends Component {
  render() {
    return (
       <HashRouter>
            <Switch>
             <Route exact path="/"><Home/></Route>
           </Switch>
      </HashRouter>
    );
  }
}

export default App;
