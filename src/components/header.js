import React, {useEffect, useState} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink} from 'react-router-dom';
import { FaBars, FaTimes} from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css';

const Header  = () =>{
  const [navStatus, setNavStatus] = useState(false);
  const openNav = () =>{
    setNavStatus(true);
  }
  const closeNav = () =>{
    setNavStatus(false);
  }
  const [isTop,setIsTop] = useState(true)
  useEffect(()=>{
    window.addEventListener('scroll',()=>{
      let pos = window.scrollY;
      if(pos>150)
        setIsTop(false)
      else
       setIsTop(true)
    })
  })
  return(
    <header id="myHeader" name="myheader" className={isTop?"myheader":"myheader sticky"}>
      <Container fluid>
        <Row>
          <Col xs={{span:'3', offset:'9'}}>
            <button onClick={openNav} className="btn btn-nav-menu">
              <FaBars/>
            </button>
          </Col>
        </Row>
      </Container>
      <div className={navStatus?"nav-menu-con":"nav-menu-con closed"}>
        <Container fluid>
          <Row className="justify-content-center">
            <Col xs={{span:'3', offset:'9'}}>
              <button onClick={closeNav} className="btn btn-nav-close">
                <FaTimes/>
              </button>
            </Col>
          </Row>
        </Container>
        <div className="my-5"></div>
        <Container>
          <Row className="">
            <Col md={4}>
              <ul className="nav-items">
                <li onClick={closeNav}>
                  <NavLink exact to="/home" activeClassName="red">Home</NavLink>
                </li>
                <li onClick={closeNav}>
                  <a href="/home/#about">About</a>
                </li>
                <li onClick={closeNav}>
                  <a href="/home/#service">Service</a>
                </li>
                <li onClick={closeNav}>
                  <NavLink to="/projects" activeClassName="red">Projects</NavLink>
                </li>
                <li onClick={closeNav}>
                  <a href="/home/#contact">Contact</a>
                </li>
              </ul>
            </Col>
          </Row>
        </Container>
      </div>
    </header>
  )
}

export default  Header
