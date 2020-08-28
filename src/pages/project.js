import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AOS from "aos";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import proj1 from '../assets/images/proj1.jpg';
import proj2 from '../assets/images/proj2.jpg';
import proj3 from '../assets/images/proj3.jpg';
import proj4 from '../assets/images/proj4.jpg';
import proj5 from '../assets/images/proj5.jpg';

class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {

    };
}

render() {
  return (
    <h1>Hi</h1>
  );
}
}
export default Project;
