import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
// import me from '../assets/images/imgMe.jpg';
import bgShape from '../assets/images/bg-shape.png';
import fgAvatar from '../assets/images/weeknd-bw.png';
import imgMe from '../assets/images/weeknd-2.png';
import branding from '../assets/images/branding.jpg';
// import webdev from '../assets/images/webdev.png';

// design images
import design1 from '../assets/images/designs/design1.jpg';
import design2 from '../assets/images/designs/design2.jpg';
import design3 from '../assets/images/designs/design3.jpg';
import design4 from '../assets/images/designs/design4.jpg';
import design5 from '../assets/images/designs/design5.jpg';
import design6 from '../assets/images/designs/design6.jpg';

class Resume extends React.Component {
  componentDidMount(){
  }
    render(){
      AOS.init({
        duration: 1000,
        once: true
    });
    return (
     <div>
       <section className="content-wrap">
          <Container fluid>
            <Row>
              <Col md={1}></Col>
                <Col md={6}>
                  <div className="main-text" data-aos="fade-right">
                    <h1 className="text-xxl"> Hello<span className="red">.</span></h1>
                    <h2 className="text-xl"><span className="red">I am</span> Samartha</h2>
                    <Row>
                      <Col xs={2} className="text-right">
                        <h2 className="red" style={{fontSize:'3rem'}}><FontAwesomeIcon icon={faTerminal}/></h2>
                      </Col>
                      <Col xs={8}>
                        <ul className="list-a">
                          <li>Fullstack Developer &</li>
                          <li>Graphic Designer <span className="anim-blink red">|</span></li>
                        </ul>
                      </Col>
                    </Row>
                  </div>
                </Col>
                <Col md={5}>
                  <div className="image-con">
                    <div className="image-bg" data-aos="fade-left" data-aos-delay="200">
                      <Image src={bgShape}  alt={"yunghog"}/>
                    </div>
                    <div className="image-fg" data-aos="fade-left" data-aos-delay="600">
                      <Image src={fgAvatar}  alt={"yunghog"}/>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
     </div>
      );
    }
}

export default Resume;
