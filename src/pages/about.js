import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
function About() {
  return (
    <section>
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="text-xxl"> About<span className="red">.</span></h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-xl"><span className="red">I am</span> Samartha</h2>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default About;
