import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
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
    this.state = {};
  }
render() {
  AOS.init({duration: 1000,once: true});
  return (
    <section className="full-page-section" style="{{backgroundColor: '#e22'}}">

    </section>
    );
  }
}
export default Project;
