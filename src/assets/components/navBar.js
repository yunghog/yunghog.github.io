import React, { Component } from 'react';
import ReactDOM from "react-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import { ReactBootstrapStyle,Navbar,Button,Nav,NavDropdown } from 'react-bootstrap';
const link_style={
    fontFamily: 'monumental',
    color: '#eee'
};
class Navbar1 extends Component {
	render() {
		return (
      <header id={"myHeader"}  ref={ref => this.id = ref} >
        <Navbar  expand="lg" style={{ width: '100%', backgroundColor: '#e220' }}>
          <Navbar.Brand href="/" className="red"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-right">
            <Nav className="mr-auto ">
              <Nav.Link activeClassName="active"  style={link_style} href="/">home</Nav.Link>
              <Nav.Link  style={link_style}  activeClassName="active" href="/about">about</Nav.Link>
              <Nav.Link style={link_style} href="/project">projects</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
		)
	}
  navFix=()=>{
    // window.onscroll = function() {myFunction()};
    // var header = document.getElementsByTagName('header')
    var header =  this.refs.myHeader;
    // var sticky = header.getBoundingClientRect()+150;
    alert(this.refs.myHeader);
    function myFunction() {
      if (window.pageYOffset > 200) {
        header.classList.add("sticky-header");
      }else {
        header.classList.remove("sticky-header");
      }
    }
  }
}
export default Navbar1;
