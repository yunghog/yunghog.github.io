import React, {Component} from "react";
import { Container,Row,Col, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
    this.div1 = React.createRef();
    this.open=this.open.bind(this);
}
 open() {
   const x=this.div1.current;
    x.style.display="none";
    alert('bih');
  };
render() {

  return (
    <section>

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
              <Button  onClick={this.open}>pop</Button>
              <div ref={this.div1}><h1 className="text-xxl"> projects<span className="red">.</span></h1></div>
            </Col>
          </Row>
        </Container>
    </section>
  );
}
}
export default Project;
