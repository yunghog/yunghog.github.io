import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import AOS from 'aos';
import '../assets/css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3, faAngular, faHtml5,  faReact, faNodeJs, faBootstrap, faJs, faPhp, faGitAlt, faBitbucket, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope ,faAtom } from "@fortawesome/free-solid-svg-icons";

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
        </div>
      </section>
    );
  }
}
export default About;
