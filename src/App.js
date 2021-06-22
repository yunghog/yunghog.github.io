import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import Header from './components/header'
import Footer from './components/footer'

import Home from './pages/home'
import { CaseStudy } from './pages/casestudy'

class App extends Component {
  render() {
    return (
       <div>
         <Router>
           <Header/>
             <Route exact path="/">
               <Redirect to="/home"/>
             </Route>
             <Route exact path="/home" component={Home}/>
             <Route path="/casestudy/:proj" component={CaseStudy}/>
        </Router>
         <Footer/>
       </div>
    );
  }
}

export default App;
