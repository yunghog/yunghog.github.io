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
import linkTree from '../assets/images/projects/linkTree.jpg';
import linkTreeMockup from '../assets/images/projects/linkTreeMockup.png';
class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      imageToggle: 1
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
  var imageToggle=1
  function toggleLayer(e){
  console.log(e.target);
  if(imageToggle===0){
    e.target.style.zIndex="29";
    e.target.style.transform="scale(1)";
    imageToggle=1;
  }
  else{
    e.target.style.zIndex="40";
    e.target.style.transform="scale(1.2)";
    imageToggle=0;
  }

  }
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
                      <Image src={ms800hub} onClick={toggleLayer} />
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
                      <a href="http://ms800hub.rf.gd" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
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
                      <Image src={adityaAuto} onClick={toggleLayer}/>
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
                      <a href="http://adityaautomobiles.rf.gd" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
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
              <div>
                <Row noGutters>
                  <Col md={7}>
                    <div className="proj-desc-con">
                      <Image src={linkTree} onClick={toggleLayer}/>
                      <div className="proj-desc cardy inverse">
                        <h3>Custom Link-Tree</h3>
                        <p>Website | React JS</p>
                        <p>
                          MS800 Hub is an automotive club website. It is a small social media for car
                           enthusiast. Car enthusiasts can sign up and post pictures of cars, post articles
                           or their build details in blog section.
                        </p>
                        <p><FontAwesomeIcon style={icon} icon={faBootstrap}></FontAwesomeIcon>
                        <FontAwesomeIcon style={icon} icon={faReact}></FontAwesomeIcon>
                        <FontAwesomeIcon style={icon} icon={faNodeJs}></FontAwesomeIcon></p>
                      <a href="https://yunghog.github.io/link-tree" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
                      </div>
                    </div>
                  </Col>
                  <Col md={5}>
                    <div className="proj-mockup cell-right">
                      <div className="cardy ">
                        <ul>
                          <li>Client : ---</li>
                          <li>Client : ---</li>
                          <li>Client : ---</li>
                        </ul>
                      </div>
                      <Image src={linkTreeMockup}/>
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
