import React, { Component } from 'react';
import { BrowserRouter, HashRouter, Route, Switch } from 'react-router-dom';

import Header from './assets/components/header';
import Footer from './assets/components/footer';
import Navbar1 from './assets/components/navBar';


import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import MS800hub from './pages/ms800hub';



class App extends Component {
  render() {
    return (
       <HashRouter>
        <div>
          <Navbar1 />
            <Switch>
             <Route exact path="/" component={Home}/>
             <Route path="/about" component={About}/>
             <Route path="/project" component={Project}/>
             <Route path="/ms800hub" component={MS800hub}/>
           </Switch>
             <Footer/>
        </div>
      </HashRouter>
    );
  }
}

export default App;
