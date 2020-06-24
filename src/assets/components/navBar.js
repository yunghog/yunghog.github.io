import React, { Component } from 'react';
import ReactDOM from "react-dom";
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
                <Nav.Link activeclassname="active" id="h" className="navLink" href="/">home</Nav.Link>
                <Nav.Link activeclassname="active" id="a" className="navLink" href="/about">about</Nav.Link>
                <Nav.Link activeclassname="active" id="p" className="navLink" href="/project">projects</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </header>
  		)
  	}
}

export default Navbar1;
