import React from 'react';
import { Container,Row,Col, Image  } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import ReactPageScroller from 'react-page-scroller';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
import {ProjectCarousel} from '../assets/components/projectsCarousel';
class Resume extends React.Component {
  constructor(props) {
  super(props);
  this.state = { currentPage: null };
}
handlePageChange = number => {
this.setState({ currentPage: number }); // set currentPage number, to reset it from the previous selected.
};
  componentDidMount(){
    document.getElementById('myHeader').style.position='fixed';
  }
    render(){
      AOS.init({
        duration: 1000,
        once: true
    });
    document.getElementById('root').style.paddingBottom='0px';
    return (
      <div>
        <section style={{minHeight:'100vh'}}>
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
            <Container className="component">
              <Row>
                <Col md={12}>
                  <h1 className="text-xxl">Skills<span className="red">.</span></h1>
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
          </ReactPageScroller>
        </section>
      </div>
      );
    }
}

export default Resume;
