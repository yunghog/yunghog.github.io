import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';

import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class MS800hub extends React.Component{
  render(){
    return (
          <section className="content-wrap fadeUp-anim">
            <div>
              <Container>
                <Row>
                  <Col>
                    <h1 className="text-xxl"> MS800hub<span className="red">.</span></h1>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        );
      }
}
export default MS800hub;
