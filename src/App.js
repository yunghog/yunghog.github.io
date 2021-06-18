import React, { Component } from 'react'
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom'

import Footer from './components/footer'

import Home from './pages/home'

class App extends Component {
  render() {
    return (
       <div>
         <HashRouter>
              <Switch>
               <Route exact path="/"><Home/></Route>
             </Switch>
        </HashRouter>
         <Footer/>
       </div>
    );
  }
}

export default App;
