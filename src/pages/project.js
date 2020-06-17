import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
function Project() {
  return (
    <section>
      <div>
        <Container className="fadeUp-anim">
          <Row>
            <Col>
              <h1 className="text-xxl"> projects<span className="red">.</span></h1>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Project;
