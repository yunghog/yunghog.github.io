import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReact, faNodeJs, faBootstrap, faJs, faPhp} from "@fortawesome/free-brands-svg-icons";
import ms800hub from '../images/projects/ms800hub.jpg';
import ms800hubMock from '../images/projects/ms800hubMockup.png';
import ms800hubBg from '../images/projects/ms800hubsiteui.jpg';
import adityaAuto from '../images/projects/adityaAuto.jpg';
import adityaAutoMockup from '../images/projects/adityaAutoMockup.png';
import linkTree from '../images/projects/linkTree.jpg';
import linkTreeMockup from '../images/projects/linkTreeMockup.png';
class ProjectFullSection extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
  }
render() {
  AOS.init({duration: 1000,once: true});
  return (
    <section className="full-page-section" style={{backgroundImage:`url(${this.props.bgImage})`}}>
      <Container>
        <Row>
          <Col>
            <h1>{{this.props.title}}</h1>
            <h3>{{this.props.client}}</h3>
          </Col>
        </Row>
      </Container>
    </section>
    );
  }
}
export default ProjectFullSection;
