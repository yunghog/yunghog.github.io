import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './assets/components/header';
import Footer from './assets/components/footer';

import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import Resume from './pages/resume';



class App extends Component {
  render() {
    return (
       <BrowserRouter>
          <Header/>
            <Switch>
             <Route exact path="/"><Home/></Route>
             <Route path="/about"><About/></Route>
             <Route path="/project"><Project/></Route>
             <Route path="/resume"><Resume/></Route>
           </Switch>
           <Footer/>
      </BrowserRouter>
    );
  }
}

export default App;
