import React, { Component } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './assets/components/header';
import Footer from './assets/components/footer';

import Home from './pages/home';
import About from './pages/about';
import Project from './pages/project';
import Resume from './pages/resume';
import NotFound from './pages/not-found';



class App extends Component {
  render() {
    return (
       <HashRouter>
          <Header/>
            <Switch>
             <Route exact path="/"><Home/></Route>
             <Route path="/about"><About/></Route>
             <Route path="/project"><Project/></Route>
             <Route path="/resume"><Resume/></Route>
             <Route path="/oops" component={NotFound} />
             <Redirect  from="*" to="/oops" />
           </Switch>
           <Footer/>
      </HashRouter>
    );
  }
}

export default App;
