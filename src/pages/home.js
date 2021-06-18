import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';
import GitHubCalendar from 'react-github-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'
import { FaTerminal } from "react-icons/fa";
import bgShape from '../assets/images/bg-shape.png';
import fgAvatar from '../assets/images/weeknd-bw.png';
class Body extends React.Component {
  render(){
    return (
      <section>
          <Container fluid className="full-page-section hero-center">
            <Row noGutters>
              <Col md={7}>
                <div className="hero-con">
                  <h1 className="text-xxl">
                    HELLO !
                  </h1>
                  <h2 className="text-xl">
                    I am
                    <span className=" px-2 text-primary">
                        Samartha
                    </span>
                  </h2>
                  <div className="sub-text">
                    <span className="dev-icon text-xxl text-primary">
                      <FaTerminal/>
                    </span>
                    <span>
                      <ul>
                        <li>Fullstack Developer</li>
                        <li>Graphic Designer
                            <span className="cursor"> | </span>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="hero-img">
                  <img src={bgShape} className="blob" alt="yunghog"/>
                  <img src={fgAvatar} className="weeknd" alt="yunghog"/>
                </div>
              </Col>
            </Row>
          </Container>
      </section>
    );
  }
}

export default Body;
