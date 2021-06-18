import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';
import GitHubCalendar from 'react-github-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import bgShape from '../assets/images/bg-shape.png';
import fgAvatar from '../assets/images/weeknd-bw.png';
class Body extends React.Component {
  componentDidMount(){
  }
  render(){
    AOS.init({
      duration: 1000,
      once: true
    });
    return (
      <section className="content-wrap">
          hello
      </section>
    );
  }
}

export default Body;
