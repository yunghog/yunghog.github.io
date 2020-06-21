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
        <Container>
        <Row>
            <Col>
              <h2 className="text-xl">Web Development</h2>
            </Col>
          </Row>
          <Row>
            <Col>
            <Modal open={open} onClose={this.onCloseModal} little>
              <h3>hi gi</h3>
              <Button bsStyle="success" bsSize="small" onClick ={(ev) => {console.log(ev)} }> Save </Button>
            </Modal>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
}

export default Project;
