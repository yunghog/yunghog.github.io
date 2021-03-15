import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';
import GitHubCalendar from 'react-github-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import Skills from '../assets/components/skills.js'
import Contact from '../assets/components/contact.js'
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
                  <div className="image-bg" data-aos="fade-right" data-aos-delay="200">
                    <Image src={bgShape}  alt={"yunghog"}/>
                  </div>
                  <div className="image-fg" data-aos="fade-right" data-aos-delay="600">
                    <Image src={fgAvatar}  alt={"yunghog"}/>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <br/><br/><br/>
          <Container>
            <h2 className="text-xxl" data-aos="fade-up">Services<span className="red">.</span></h2>
            <br/><br/>
            <Row>
              <Col md={6}>
                <div className="home-about cardy cell-left" data-aos="fade-right">
                  <br></br>
                  <h3>Development</h3>
                  <ul>
                    <li>Website/Web Application Development</li>
                    <li>Hybrid App Development</li>
                    <li>Website domain registration and hosting</li>
                  </ul>
                </div>
              </Col>
              <Col md={6}>
                <div className="home-about cardy cell-right" data-aos="fade-right">
                  <br></br>
                  <h3>Design Works</h3>
                  <ul>
                    <li>Logo Designing</li>
                    <li>Poster/Flyer designing</li>
                    <li>Banner Designing</li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <h2 className="text-xxl"  data-aos="fade-up">WORKS<span className="red">.</span></h2>
                <br/><br/>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <div className="home-about cardy cell-left" data-aos="fade-right">
                  <h3>Fullstack Projects</h3>
                  <Row>
                    <Col md={6}>
                      <ul>
                        <li>Aditya Automobiles</li>
                        <li>Creed Thoughts : Blog</li>
                        <li>GFGC, Kalasa</li>
                        <li>Self-Checkout App</li>
                      </ul>
                    </Col>
                    <Col md={6}>
                      <ul>
                        <li>Ad-Blocker</li>
                        <li>DMS App</li>
                        <li>MS800HUB</li>
                      </ul>
                    </Col>
                  </Row>
                  <Row><Col>
                    <Link to='/projects' className="red"><button className="btn btn-1">projects</button></Link>
                  </Col></Row>
                </div>
              </Col>
              <Col md={4}>
                <div  className="home-about cardy cell-right inverse"  data-aos="fade-right"><Skills tools="none"/></div>
              </Col>
            </Row>

          </Container>
          <br/>
          <Container fluid style={{padding:'0px'}}>
            <Row xs={1} md={4} noGutters>
              <Col>
                <div className="proj-count" data-aos="fade-up">
                  <h2 id="count"><CountUp end={20} duration={5}/>+</h2>
                  <h5>Projects made</h5>
                </div>
              </Col>
              <Col>
                <div className="proj-count" data-aos="fade-up">
                  <h2 id="count"><CountUp end={5} duration={5}/>+</h2>
                  <h5>Happy Clients</h5>
                </div>
              </Col>
              <Col>
                <div className="proj-count" data-aos="fade-up">
                  <h2 id="count"><CountUp end={100} duration={5}/>+</h2>
                  <h5>Designs</h5>
                </div>
              </Col>
              <Col>
                <div className="proj-count" data-aos="fade-up">
                  <h2 id="count"><CountUp end={5} duration={5}/>+</h2>
                  <h5>Websites Hosted</h5>
                </div>
              </Col>
            </Row>
          </Container>
          <br/><br/>
          <Container>
            <Row>
              <Col md={12}>
                <h2 className="text-xxl" data-aos="fade-up">About<span className="red">.</span></h2>
                <br/><br/>
              </Col>
            </Row>
            <Row>
              <Col md={5}>
                <div className="cardy home-about home cell-left inverse" data-aos="fade-right">
                  <h3>Short Information</h3>
                  <ul>
                    <li>Name : Samartha</li>
                    <li>Based in : Sagar, Shimoga</li>
                    <li>Mail : Samarthaog@gmail.com</li>
                    <li>Phone : +91 8904460742</li>
                  </ul>
                </div>
              </Col>
              <Col md={7}>
                <div className="home-about cardy cell-right" data-aos="fade-right">
                  <h3>About me</h3>
                  <p className="para">
                    Im a 21 yo freelance fullstack Developer, Graphic Designer and Music Producer based in Sagar.
                    I have experience in making websites, logo and poster designing .Im very passionate
                    and dedicated to my work. I have acquired the skills necessary to build great and premium websites.
                    I make beats when Im free :)
                    <br/>
                  </p>
                  <Link to='/about' className="red"><button className="btn btn-1">about</button></Link>
                </div>
              </Col>
            </Row>
          </Container>
          <br/>
        <Container className="d-none d-md-block">
          <Row>
            <Col md={3}>
              <h2 className="text-right" data-aos="fade-up">Github Activity<span className="red">.</span></h2>
            </Col>
            <Col md={9} color="hsl(203, 82%, 33%)" >
              <div className="cardy home-about home" data-aos="fade-right">
                <GitHubCalendar username="yunghog"/>
              </div>
            </Col>
          </Row>
        </Container>
        <br/>
        <Container>
          <Row>
            <Col md={12}>
              <h2 className="text-xxl" data-aos="fade-up">Send a mail<span className="red">.</span></h2>
            </Col>
          </Row>
          <Row>
            <Col md={7}>
              <div className="cardy home-about home" data-aos="fade-right">
                <Contact/>
              </div>
            </Col>
          </Row>
        </Container>
        <br/><br/><br/><br/>
      </section>
    );
  }
}

export default Body;
