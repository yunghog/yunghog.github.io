import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './assets/components/header';
import Footer from './assets/components/footer';

import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';


class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
          <Header />
            <Switch>
             <Route path="/" component={Home} exact/>
             <Route path="/about" component={About}/>
             <Route path="/project" component={Project}/>
           </Switch>
             <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
