import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReact, faNodeJs, faBootstrap, faJs, faPhp} from "@fortawesome/free-brands-svg-icons";
class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
}

render() {
  AOS.init({
    duration: 1000,
    once: true
});
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
          </Col>
        </Row>
      </Container>
    </section>
  );
}
}
export default Project;
