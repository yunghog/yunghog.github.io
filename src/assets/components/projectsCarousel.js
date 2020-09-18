import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import {faReact, faNodeJs, faBootstrap, faJs, faPhp, faJava, faPython} from "@fortawesome/free-brands-svg-icons";
import ms800hub from '../images/projects/ms800hub.jpg';
import ms800hubp from '../images/projects/ms800hubp.jpg';
import ms800hubMock from '../images/projects/ms800hubMockup.png';
import adityaAuto from '../images/projects/adityaAuto.jpg';
import adityaAutop from '../images/projects/adityaautomobilesp.jpg';
import adityaAutoMockup from '../images/projects/adityaAutoMockup.png';
import linkTree from '../images/projects/linkTree.jpg';
import linkTreeMockup from '../images/projects/linkTreeMockup.png';
export class ProjectCarousel extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      height: 0,
      width: 0
    };
    window.addEventListener("resize", this.update);
}
componentDidMount(){
  this.update();
}
update = () => {
  this.setState({
    height: window.innerHeight,
    width: window.innerWidth
  });
};
center=()=>{
  if(this.state.width>=720){
    return true;
  }
  else{
    return false;
  }
};
render() {
  AOS.init({
    duration: 1000,
    once: true
});
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 2,
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
      <Container fluid>
        <Row>
          <Col>
            <Carousel responsive={responsive}
              autoPlay={true}
              autoPlaySpeed={5000}
              infinite={true}
              containerClass="carousel-container"
              swipeable={true}
              centerMode={this.center()}>
              <div>
                {/*<Image src={ms800hub} className="proj-img d-none d-sm-none d-md-block d-lg-block"/>*/}
                <Image src={ms800hubp} className="proj-img"/>
              </div>
              <div>
                <div className="cardy home-about inverse  text-left cell-right">
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
              <div>
                <div className="cardy home-about">
                  <h3>Dealership Management System</h3>
                  <p>Academic Project | DBMS | JAVA</p>
                  <p>
                    Dealership Management System (DMS) is a java application which can be
                    implemented in an Automobile Workshops or Vehicle Service Centers to
                    maintain and manipulate the records of job orders and other workshop properties
                  </p>
                  <p><FontAwesomeIcon style={icon} icon={faJava}></FontAwesomeIcon>
                  <FontAwesomeIcon style={icon} icon={faDatabase}></FontAwesomeIcon></p>
                  <a href="https://github.com/yunghog/Dealership-Management-System" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
                </div>
              </div>
              <div>
                {/*<Image src={adityaAuto} className="proj-img d-none d-sm-none d-md-block d-lg-block"/>*/}
                <Image className="proj-img" src={adityaAutop}/>
              </div>
              <div>
                <div className="cardy home-about  text-left cell-right">
                  <h3>Aditya Automobiles</h3>
                  <p>Website | LAMP Stack</p>
                  <p>
                    Aditya Automobiles is a well known Suzuki Arena (Maruti Suzuki authorized workshop in Sagar town).
                    I made them a website to support their business and provide customers with online service booking system
                    to book an appointment for their car.
                  </p>
                  <p><FontAwesomeIcon style={icon} icon={faBootstrap}></FontAwesomeIcon>
                  <FontAwesomeIcon style={icon} icon={faJs}></FontAwesomeIcon>
                  <FontAwesomeIcon style={icon} icon={faPhp}></FontAwesomeIcon></p>
                  <a href="http://adityaautomobiles.rf.gd" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
                </div>
              </div>
              <div>
                <div className="home-about cardy inverse">
                  <h3>Custom Link-Tree</h3>
                  <p>Website | React JS</p>
                  <p>
                    Link tree is a webpage which contains all links to the profiles of various platform of the client.
                    I could make a custome Link Tree webpage based on clients requirement.
                  </p>
                  <p><FontAwesomeIcon style={icon} icon={faBootstrap}></FontAwesomeIcon>
                  <FontAwesomeIcon style={icon} icon={faReact}></FontAwesomeIcon>
                  <FontAwesomeIcon style={icon} icon={faNodeJs}></FontAwesomeIcon></p>
                  <a href="https://yunghog.github.io/link-tree" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
                </div>
              </div>
              <div>
                <div className="cell-right text-left home-about cardy">
                  <h3>Host Editor</h3>
                  <p>CLI Script | Python 3.7</p>
                  <p>
                    Ad-Blocker built using Python 3.7.x. Block annoying ads by appending the ad domains into host file with ease using command line application.
                  </p>
                  <p><FontAwesomeIcon style={icon} icon={faPython}></FontAwesomeIcon></p>
                  <a href="https://github.com/yunghog/host-editor" target="_blank" rel="noopener noreferrer"><button className="btn btn-3">visit</button></a>
                </div>
              </div>
            </Carousel>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
}
