import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import me from '../assets/images/imgMe.jpg';

class Body extends React.Component {
  active(){
  document.getElementById('h').classList.add('active');
  }
    render(){
      return (
        <section className="content-wrap" onMouseOver={this.active}>
          <div>
            <Container className="fadeUp-anim">
              <Row>
                <Col>
                  <h1 className="text-xxl"> Hello<span className="red">.</span></h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h2 className="text-xl"><span className="red">I am</span> Samartha</h2>
                </Col>
              </Row>
              <Row>
              <Col xs={2} className="text-right">
              <h2 className="red" style={{fontSize:'3rem'}}><FontAwesomeIcon icon={faTerminal}/></h2>
            </Col>
              <Col xs={8}>
              <ul className="list-a">
                <li>Developer &</li>
              <li>Graphic Designer <span className="anim-blink red">|</span></li>
              </ul>
              </Col>
              </Row>
            </Container>
            <Container>
            <Row>
            <Col sm={6}>
            <p className="para">
              Im a 20 yo full stack Developer, Graphic Designer and Music Producer based in Sagar.
              I have experience in making websites, logo and poster designing .Im very passionate
               and dedicated to my work. I have acquired the skills necessary to build great and premium websites.
               I make beats when Im free :)
              <br/><NavLink to='/about' className="red">More about me.>></NavLink>
            </p>
            </Col>
            </Row>
            <Row>
              <Col sm={6}>
                <div className="intro-box">
                  <ul>
                    <li><span class="red">Name:</span> Samartha</li>
                    <li><span class="red">Age:</span> 20</li>
                    <li><span class="red">Phone:</span> +91 8904460742</li>
                    <li><span class="red">Github:</span> yunghog</li>
                    <li><span class="red">Email:</span> Samarthahm@gmail.com</li>
                  </ul>
                </div>
              </Col>
              <Col sm={4}>
                <Image className="image-port" src={me}/>
              </Col>
            </Row>
            </Container>
          </div>
          <br/><br/>
        </section>
      );
    }
}

export default Body;
