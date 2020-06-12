import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
function Body() {
  return (
    <section>
      <div>
        <Container>
          <Row>
            <Col>
              <h1 className="text-xxl"> Hello<span className="red">.</span></h1>
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-xl"><span className="red">I am</span> Samartha</h2>
            </Col>
          </Row>
          <Row>
          <Col xs={2} className="text-right">
          <h2 className="red" style={{fontSize:'3rem'}}><FontAwesomeIcon icon={faTerminal}/></h2>
        </Col>
          <Col xs={8}>
          <ul className="list-a">
            <li>Developer &</li>
          <li>Graphic Designer <span className="anim-blink red">|</span></li>
          </ul>
          </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Body;
