import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component{
  render(){
    function openNav(){
      var nav = document.getElementById('nav-con');
      nav.style.visibility="visible";
      nav.style.opacity="1";
      nav.style.paddingTop="0px";
    }
    function closeNav(){
      var nav = document.getElementById('nav-con');
      nav.style.opacity="0";
      nav.style.visibility="hidden";
      nav.style.paddingTop="20px";
    }
    return (
      <div>
      <header>
        <Container>
          <Row>
            <Col xs={2}>
              {/*ha*/}
            </Col>
            <Col xs={8}>
            </Col>
            <Col xs={2}>
              <button className="btn nav-btn" onClick={openNav}><FontAwesomeIcon icon={faBars}/></button>
            </Col>
          </Row>
        </Container>
      </header>
      <div className="nav-con" id="nav-con">
        <Container>
          <Row>
            <Col xs={10}></Col>
            <Col xs={2}><button className="btn nav-btn" onClick={closeNav}><FontAwesomeIcon icon={faTimes}/></button></Col>
          </Row>
          <Row>
            <Col md={4}>
              <ul className="nav-bar">
                <li className="nav-item active" onClick={closeNav}><Link to="/">Home</Link></li>
                <li className="nav-item" onClick={closeNav}><Link to="/about">About</Link></li>
                <li className="nav-item" onClick={closeNav}><Link>Service</Link></li>
                <li className="nav-item" onClick={closeNav}><Link>Projects</Link></li>
                <li className="nav-item" onClick={closeNav}><Link>Contact</Link></li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Header;
