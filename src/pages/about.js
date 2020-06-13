import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';

import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNodeJs, faWordpress, faAndroid, faGitAlt, faAdobe, faBootstrap, faJava, faHtml5, faCss3, faJs, faPhp, faSql, faPython } from "@fortawesome/free-brands-svg-icons";
import { faTerminal, faDatabase, faMusic  } from "@fortawesome/free-solid-svg-icons";

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
                    <p className="para">My name is Samartha. Im from Sagar, Shimoga. At present im a 3rd year Information Science
                      and Engineering student at Jawaharlal Nehru National
                    College of Engineering, Shimoga which is affilated to VTU.
                     I will graduate by 2021.</p>
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
                <Row>
                  <Col sm={12}>
                    <h2 className="text-xl">Skills</h2>
                    <div className="skill-con">
                      <h3>Frameworks</h3>
                        <Row>
                          <Col xs={12} style={{display:'inlineFlex'}}>
                            <div className="skill">
                              <Row>
                                <Col xs={4} className="text-center"><div className="skill-icon"><FontAwesomeIcon icon={faBootstrap} style={{color:'red'}}></FontAwesomeIcon></div>
                                <div className="skill-name">Bootstrap</div></Col>
                                <Col xs={4} className="text-center"><div className="skill-icon"><FontAwesomeIcon icon={faReact} style={{color:'red'}}></FontAwesomeIcon>
                                <div className="skill-name">React.js</div></div></Col>
                                <Col xs={4} className="text-center"><div className="skill-icon"><FontAwesomeIcon icon={faNodeJs} style={{color:'red'}}></FontAwesomeIcon>
                                <div className="skill-name">Node.js</div></div></Col>
                              </Row>
                            </div>
                          </Col>
                        </Row>
                        <br/>
                        <h3>Languages</h3>
                          <Row>
                            <Col xs={12} style={{display:'inlineFlex'}}>
                              <div className="skill">
                                <Row>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faJava} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">JAVA</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faPython} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Python</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faPhp} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">PHP</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faJs} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">Javascript</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faCss3} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">CSS</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faHtml5} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">HTML</div></Col>
                                <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                <FontAwesomeIcon icon={faTerminal} style={{color:'red'}}>
                                </FontAwesomeIcon></div>
                                <div className="skill-name">Shell Script</div></Col>
                                </Row>
                              </div>
                            </Col>
                          </Row>
                          <br/>
                            <h3>Tools</h3>
                              <Row>
                                <Col xs={12} style={{display:'inlineFlex'}}>
                                  <div className="skill">
                                  <Row>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faDatabase} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">mySQL</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faDatabase} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Oracle</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faAndroid} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Android Studio</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faWordpress} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Wordpress</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faGitAlt} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Git</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faAdobe} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">Photoshop</div></Col>
                                  <Col sm={2} xs={4} className="text-center"><div className="skill-icon">
                                  <FontAwesomeIcon icon={faMusic} style={{color:'red'}}>
                                  </FontAwesomeIcon></div>
                                  <div className="skill-name">FL Studio</div></Col>
                                    </Row>
                                  </div>
                                </Col>
                              </Row>
                          <br/>
                    </div>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <h2 className="text-xl" id="service">Services</h2>
                    <div className="service">
                      <h3>Web development</h3>
                      <p>I can create and host Websites and Web Applications.
                      Using either MERN Stack or Bootstrap+Php+JS. I guaruntee a clean, error free and
                      fully responsive web pages with beautiful frontend design. You can choose between
                       various plans. Contact for plan details and any other queries</p>
                    </div>
                    <br/>
                    <div className="service">
                      <h3>Android App development</h3>
                      <p>Currently I develop Apps based on Android web view</p>
                    </div>
                    <br/>
                    <div className="service">
                      <h3>Graphic Designing</h3>
                      <p>I offer Logo designing, Poster and Flyer designing.
                         I guaruntee high quality and very beautiful graphic content.</p>
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
