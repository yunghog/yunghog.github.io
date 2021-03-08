import React from 'react';
import { Container,Row,Col, Image  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import ReactPageScroller from 'react-page-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3, faAngular, faHtml5,
        faReact, faNodeJs, faBootstrap,
        faJs, faPhp, faGitAlt, faBitbucket,
         faInstagram, faWhatsapp, faPython
       } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope ,faAtom, faDatabase, faDownload } from "@fortawesome/free-solid-svg-icons";
import {ProjectCarousel} from '../assets/components/projectsCarousel';
class Resume extends React.Component {
  constructor(props) {
  super(props);
  this.state = {currentPage: null};
  }
handlePageChange = number => {
this.setState({ currentPage: number });
};
  componentDidMount(){
    document.getElementById('myHeader').style.position='fixed';
    document.getElementById('myFooter').style.display='none';
  }
  componentWillUnmount(){
    document.getElementById('myFooter').style.display='absolute';
  }
    render(){
      const icon={
        margin: '5px',
        fontSize: '35px'
      };
      AOS.init({
        duration: 1000,
        once: true
    });
    return (
      <div>
        <section>
          <ReactPageScroller
            pageOnChange={this.handlePageChange}
            customPageNumber={this.state.currentPage}
            renderAllPagesOnFirstRender
            >
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h1 className="text-xxl"> Resume<span className="red">.</span></h1>
                </Col>
              </Row>
              <br/>
              <Row className="">
                <Col md={8}>
                  <div className="home-about cardy" data-aos="fade-right">
                    <h3>Profile Sumary</h3>
                    <p className="para">Seeking an entry-level opportunity with an esteemed organization
                    where I can utilize my skills and enhance learning in the field of work. Capable
                    of mastering new technologies. Fields of interests are Machine Learning,
                    Artificial Intelligence and Full-Stack Development. Highly skilled at Web
                    Development and Python programming.</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h2>Experience<span className="red">.</span></h2>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col md={8}>
                  <div className="home-about cardy">
                    <h3>Full-Stack Development</h3>
                    <h5>Intern, Ekathva Innovations Pvt. LTD, Shimoga</h5>
                    <p className="para red">2019 - Present </p>
                    <p className="para">Designed, implemented and monitored web pages and sites for continuous improvement.
                       Used programming capabilities in PHP, SQL and JavaScript and other languages as
                       needed. Used various technologies, including Bootstrap to make code repairs and
                       optimize corporate websites.</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h2> Qualification<span className="red">.</span></h2>
                </Col>
              </Row>
              <br/>
              <Row>
                <Col md={6}>
                  <div className="home-about cardy">
                    <h5>Bachelor of Engineering, ISE</h5>
                    <p>Jawaharlal Nehru National College of Engineering, Shimoga</p>
                    <p className="red">2017 - 21</p>
                    <p>7.5 CGPA</p>
                  </div>
                </Col>
                <Col md={6}>
                  <div className="home-about cardy cell-right text-left">
                    <h5>Senior Secondary</h5>
                    <p>GPUC, Sagar</p>
                    <p className="red">2016 - 17</p>
                    <p>86%</p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container id="skills" className="component">
              <Row>
                <Col md={12}>
                  <h1 className="text-xxl">Skills<span className="red">.</span></h1>
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <div className="home-about cardy inverse cell-right text-left">
                    <h3>Frameworks</h3>
                    <p><FontAwesomeIcon icon={faBootstrap} style={icon}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faReact} style={icon}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faNodeJs} style={icon}></FontAwesomeIcon>
                    <FontAwesomeIcon icon={faAngular} style={icon}></FontAwesomeIcon></p>
                  </div>
                </Col>
                <Col md={4}>
                  <div className="cardy home-about cell-left text-left">
                    <h3>Languages</h3>
                      <p><FontAwesomeIcon icon={faCss3} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faHtml5} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faJs} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faPython} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faPhp} style={icon}></FontAwesomeIcon>
                      <span style={{fontFamily:'monumental',color:'#e22'}}>C++</span></p>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={4}></Col>
                <Col md={4}>
                  <div className="cardy home-about cell-left text-left">
                    <h3>Tools</h3>
                      <p><FontAwesomeIcon icon={faAtom} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faGitAlt} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faDatabase} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faBitbucket} style={icon}></FontAwesomeIcon></p>
                  </div>
                </Col>
              </Row>
            </Container>
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h1 className="text-xxl"> Projects<span className="red">.</span></h1>
                </Col>
              </Row>
              <ProjectCarousel/>
            </Container>
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h1 className="text-xxl">Others<span className="red">.</span></h1>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="cardy home-about cell-right text-left">
                    <h3>Trainings and Workshops<span className="red">.</span></h3>
                    <ul>
                      <li>Hybrid mobile application development using Ionic framework</li>
                      <li>Basics of ethical hacking</li>
                      <li>Workshop on basics of Machine Learning hosted by AWS</li>
                      <li>Freelancing (Web Development and Graphic Designing)</li>
                    </ul>
                  </div>
                </Col>
                <Col md={6} className="text-center mb-3">
                  <div className="cardy home-about cell-left">
                    <h3>Awards and Certifications<span className="red">.</span></h3>
                    <ul>
                      <li>Gold level in HackerRank Python coding challenges</li>
                      <li>Basics of ethical hacking</li>
                      <li>HackerRank certification for Python programming skills</li>
                    </ul>
                  </div>
                  <br/>
                  <a className="btn btn-1 btn-lg" href="https://drive.google.com/file/d/1KsPZvtUke-FAwhkqHFEDcLDrePgRXBPD/view?usp=sharing" download target="_blank"><FontAwesomeIcon icon={faDownload}></FontAwesomeIcon>   Download my resume</a>
                </Col>
              </Row>
            </Container>
          </ReactPageScroller>
        </section>
      </div>
      );
    }
}

export default Resume;
