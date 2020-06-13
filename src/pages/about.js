import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';

import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
class About extends React.Component{
  active=()=>{
    document.getElementById('about').style.textDecoration('underline');
    alert('hello');
  }
  render(){
    return (
          <section className="content-wrap fadeUp-anim">

            <div>
              <Container>
                <Row>
                  <Col>
                    <h1 className="text-xxl"> About<span className="red">.</span></h1>
                  </Col>
                </Row>
                <Row>
                  <Col sm={8}>
                    <h2 className="text-xl">Myself</h2>
                    <p className="para">My name is Samartha. Im from Sagar, Shimoga. At present im a 3rd year Information Scince and Engineering student at Jawaharlal Nehru National
                    College of Engineering, Shimoga which is affilated to VTU. I will graduate by 2021.</p>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm={8}>
                    <h2 className="text-xl">Education</h2>
                    <div className="edu">
                      <h5>JNNCE<span> 2017-21</span></h5>
                      <p>B.E in Information Science and Engineering <br/> Affilated to VTU. <span className="red">CGPA: 7.49</span></p>
                    </div>
                    <br/>
                    <div className="edu">
                      <h5>Govt. PU Colege<span> 2015-17</span></h5>
                      <p>Pre University. Science (Physics, Chemistry, Maths & Computer Science ) <br/><span className="red">Percentage: 86.75%</span></p>
                    </div>
                    <br/>
                    <div className="edu">
                      <h5>Pragathi Composite School<span> 1st to 10th Grade</span></h5>
                      <p>Karnataka state board.<br/>Passed 10th grade with <span className="red">95%</span></p>
                    </div>
                  </Col>
                </Row>
                <br/>
              </Container>
            </div>
          </section>
        );
      }
}
export default About;
