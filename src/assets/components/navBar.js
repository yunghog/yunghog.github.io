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
  constructor(props){
    super(props);
    this.state = {};
    this.myHeader = React.createRef();
}
 render() {
		return (
      <header >
      <script type="text/javascript">
      window.onscroll = function() {myFunction()};
      const header1=this.myHeader.current;
      const sticky = header1.offsetTop+150;
      alert(header1.style.display);
      myFunction=()=>{
        if (window.pageYOffset > sticky) {
          header1.classList.add("sticky-header");
        }else {
          header1.classList.remove("sticky-header");
        }
      }
      </script>
        <Navbar  expand="lg" className="navBar" ref={this.myHeader}>
          <Navbar.Brand href="/" className="red"></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className="text-right">
            <Nav className="mr-auto ">
              <Nav.Link activeClassName="active"  style={link_style} href="/">home</Nav.Link>
              <Nav.Link  style={link_style}  activeclassname="active" href="/about">about</Nav.Link>
              <Nav.Link style={link_style} activeclassname="active" href="/project">projects</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
		)
	}

}
export default Navbar1;
