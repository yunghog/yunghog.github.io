import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
// import logo from '../images/logo.png';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

class Header extends React.Component{
  constructor(){
    super();
    this.state = {
      scrolled: false,
      home: true,
      about: false,
      project: false
    };
  }
  componentDidMount(){
    var path = window.location.pathname;
    console.log(path);
    window.addEventListener('scroll', () =>{
      const isTop = window.scrollY<200;
      if(isTop !== true){
        this.setState({scrolled: true});
      }
      else{
        this.setState({scrolled: false});
      }
    });
  }
  componentWillUnmount(){
    window.removeEventListener('scroll');
  }
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
      <header id="myHeader" className={this.state.scrolled ? 'sticky-header' : ''}>
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
                <li className="nav-item" onClick={closeNav}><NavLink exact to="/" activeClassName="red">Home</NavLink></li>
                <li className="nav-item" onClick={closeNav}><NavLink to="/about"  activeClassName="red">About</NavLink></li>
                {/*<li className="nav-item" onClick={closeNav}><NavLink exact to="/"  activeClassName="red">Service</NavLink></li>*/}
                <li className="nav-item" onClick={closeNav}><NavLink to="/project"  activeClassName="red">Projects</NavLink></li>
                <li className="nav-item" onClick={closeNav}><NavLink to="/resume"  activeClassName="red">Resume</NavLink></li>
                {/*<li className="nav-item" onClick={closeNav}><NavLink exact to="/"  activeClassName="red">Contact</NavLink></li>*/}
              </ul>
            </Col>
          </Row>
          <br/><br/>
          <Row>
            <Col className="text-center red">
              <h2>Samartha</h2>
              <h5>Developer & <br/>Graphic Designer</h5>
              <p className="red">© 2020 All righs reserved</p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    );
  }
}

export default Header;
