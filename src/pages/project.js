import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReact, faNodeJs, faBootstrap, faJs, faPhp} from "@fortawesome/free-brands-svg-icons";
import ms800hub from '../assets/images/projects/ms800hub.jpg';
import ms800hubMock from '../assets/images/projects/ms800hubMockup.png';
import adityaAuto from '../assets/images/projects/adityaAuto.jpg';
import adityaAutoMockup from '../assets/images/projects/adityaAutoMockup.png';
class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
}

render() {
  AOS.init({
    duration: 1000,
    once: true
});
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    }
  };
  const icon = {
    fontSize: '42px',
    padding: '5px'
  };
  return (
    <section>
      <Container>
        <Row>
          <Col data-aos="fade-up">
            <h1 className="text-xxl"> Projects<span className="red">.</span></h1>
          </Col>
        </Row>
      </Container>
      <br/>
      <Container>
        <Row>
          <Col>
            <Carousel responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={7000}
              infinite={true}>
              <div>
                <Row noGutters>
                  <Col md={7}>
                    <div className="proj-desc-con">
                      <Image src={ms800hub}/>
                      <div className="proj-desc cardy inverse">
                        <h3>MS800Hub</h3>
                        <p>Web Application | LAMP Stack</p>
                        <p>
                          MS800 Hub is an automotive club website. It is a small social media for car
                           enthusiast. Car enthusiasts can sign up and post pictures of cars, post articles
                           or their build details in blog section.
                        </p>
                        <p><FontAwesomeIcon style={icon} icon={faBootstrap}></FontAwesomeIcon>
                        <FontAwesomeIcon style={icon} icon={faJs}></FontAwesomeIcon>
                      <FontAwesomeIcon style={icon} icon={faPhp}></FontAwesomeIcon></p>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="proj-mockup cell-right">
                      <Image src={ms800hubMock}/>
                    </div>
                  </Col>
                </Row>
              </div>
              <div>
                <Row noGutters>
                  <Col md={7}>
                    <div className="proj-desc-con">
                      <Image src={adityaAuto}/>
                      <div className="proj-desc cardy inverse">
                        <h3>Aditya Automobiles</h3>
                        <p>Website | LAMP Stack</p>
                        <p>
                          MS800 Hub is an automotive club website. It is a small social media for car
                           enthusiast. Car enthusiasts can sign up and post pictures of cars, post articles
                           or their build details in blog section.
                        </p>
                        <p><FontAwesomeIcon style={icon} icon={faBootstrap}></FontAwesomeIcon>
                        <FontAwesomeIcon style={icon} icon={faJs}></FontAwesomeIcon>
                      <FontAwesomeIcon style={icon} icon={faPhp}></FontAwesomeIcon></p>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="proj-mockup cell-right">
                      <Image src={adityaAutoMockup}/>
                    </div>
                  </Col>
                </Row>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
      <br/><br/><br/><br/>
    </section>
  );
}
}
export default Project;
