import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Link} from 'react-router-dom'
import AOS from 'aos';
import '../assets/css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-brands-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import {projects} from '../assets/documents/projects'
class About extends React.Component{
  constructor(props) {
    super(props);
    this.state={ };
  }
  render(){
    AOS.init({
      duration: 1000,
      once: true
    });

    return (
      <section className="content-wrap fadeUp-anim">
        <div>
          <Container>
            <Row>
              <Col data-aos="fade-up">
                <h1 className="text-xxl">Works<span className="red">.</span></h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row>
              <Col>
                <h3>Fullstack projects</h3>
              </Col>
            </Row>
            <br/>
            <Row>
              {projects.map(i=>
                <Col md={4}>
                  <div className="cardy project-card">
                    <h4>{i.title}</h4>
                    <p>{i.smalldesc}</p>
                    <Link to={i.casestudy}><button className="btn btn-2"><FontAwesomeIcon icon={faChevronRight}></FontAwesomeIcon></button></Link>
                  </div>
                </Col>
              )}
            </Row>
          </Container>
        </div>
      </section>
    );
  }
}
export default About;
