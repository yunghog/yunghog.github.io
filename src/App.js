import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './assets/components/header';
import Home from './pages/home';
import About from './pages/about';

class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
          <Header />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
           </Switch>  
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
