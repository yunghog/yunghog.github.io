import React, { Component } from 'react';
import ReactDOM from "react-dom";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { ReactBootstrapStyle,Navbar,Button,Nav,NavDropdown } from 'react-bootstrap';

class Navbar1 extends Component{

   render() {
  		return (
        <header>
          <Navbar  expand="lg" className="navBar" ref={this.myHeader}>
            <Navbar.Brand href="/" className="red"></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ml-auto" >
                <li><Link activeClassName="active" id="h" className="navLink" to="/">home</Link></li>
                <li><Link activeClassName="active" id="a" className="navLink" to="/about">about</Link></li>
                <li><Link activeClassName="active" id="p" className="navLink" to="/project">projects</Link></li>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
  		)
  	}
}

export default Navbar1;
