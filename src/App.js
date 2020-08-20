import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './assets/components/header';
import Footer from './assets/components/footer';
// import Navbar1 from './assets/components/navBar';

import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import MS800hub from './pages/ms800hub';



class App extends Component {
  render() {
    return (
       <BrowserRouter>
        <div>
          <Header/>
            <Switch>
             <Route exact path="/"><Home/></Route>
             <Route path="/about"><About/></Route>
           </Switch>
             <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
