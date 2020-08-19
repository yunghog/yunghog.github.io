import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram, faLinkedin, faGooglePlus, faYoutube } from "@fortawesome/free-brands-svg-icons";


import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css';
import logo from '../images/logo.png';

function Footer(){
  return (
    <div >
    <footer>
        <Container fluid>
          <Row>
            <Col sm={4} className="footer-text">
            <h3>Samartha</h3>
            <p>Developer & <br/>Graphic Designer</p>
            </Col>
            <Col sm={4} className="text-center">
              <img src={logo} alt="logo" style={{width:'30%'}}/>
            </Col>
            <Col sm={4} className="text-center">
            <a  className="social-icons"  target="_blank" href="https://instagram.com/samartha__"><FontAwesomeIcon icon={faInstagram}/></a>
            <a  className="social-icons"  target="_blank" href="https://github.com/yunghog"><FontAwesomeIcon icon={faGithub}/></a>
            <a  className="social-icons"  target="_blank" href="https://www.linkedin.com/in/samartha-hm-7398861a1/"><FontAwesomeIcon icon={faLinkedin}/></a>
            <a  className="social-icons"  target="_blank" href="mailto:samarthaog@gmail.com"><FontAwesomeIcon icon={faGooglePlus}/></a>
            <a  className="social-icons"  target="_blank" href="https://youtube.com/c/YUNGHOGbeats"><FontAwesomeIcon icon={faYoutube}/></a>
            </Col>
          </Row>
        </Container>
    </footer>
  </div>
  );
}

export default Footer;
