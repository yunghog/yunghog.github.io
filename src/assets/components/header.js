import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component{
  showMenu=()=>{
    var navMenu=document.getElementById('nav-link-con');
    if(navMenu.style.width!="0px"){
      navMenu.style.width="0px";
    }
    else{
      navMenu.style.width="500px";
    }
    if(navMenu.style.height=="0px"){
      navMenu.style.height="100px";
    }
  }
  render(){
    return (
      <header>
        <div>
          <Container fluid>
            <Row>
              <Col className="text-right">
                <nav className="nav-bar">
                      <ul id="nav-link-con" className="nav-link-con">
                         <li>
                         <NavLink  to="/" className="navbar__link">home</NavLink>
                         </li>
                         <li>
                         <NavLink activeClassName="navbar__link--active" to="/about" className="navbar__link ">about</NavLink>
                         </li>
                         <li>
                         <NavLink activeClassName="navbar__link--active" to="/project" className="navbar__link " id='project'>projects</NavLink>
                         </li>
                      </ul>
                      <button onClick={this.showMenu}> <FontAwesomeIcon icon={faBars}></FontAwesomeIcon> </button>
                </nav>
              </Col>
            </Row>
          </Container>
        </div>
      </header>
    );
  }
}

export default Header;
