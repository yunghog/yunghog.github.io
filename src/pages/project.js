import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import proj1 from '../assets/images/proj1.jpg';
import proj2 from '../assets/images/proj2.jpg';
import proj3 from '../assets/images/proj3.jpg';

class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value: 0
    };
    this.fu=React.createRef();
    this.det2 = React.createRef();
    this.open=this.open.bind(this);
}
open(d){
  if(d==1){
    const x=this.det2.current;
    if(x.style.height=='0px'){
      x.style.height="auto";
      x.classList.add("fadeUp-anim");
    }
    else{
      x.style.height="0px";
      x.classList.remove("fadeUp-anim");
    }
  }
  };
render() {
  const pi2={
    width:'100%',
  }
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
              <div className="proj">
                <Row>
                  <Col xl={6} className="text-center"><Image src={proj1} className="proj-img"/></Col>
                  <Col xl={6}><div className="proj-desc">
                    <h3>The MS800hub</h3>
                    <p>A community of car enthusiasts</p>
                    <ul>
                      <li><span className="red">Client : </span>MS800hub</li>
                      <li><span className="red">Role : </span>Fullstack Dev.</li>
                      <li><span className="red">Product : </span>Website, Android App</li>
                      <li><span className="red">Tools : </span>Bootstrap, JS, PHP, mySQL</li>
                      <li className="text-right"><NavLink to='/ms800hub'><button className="btn btn-1">more</button></NavLink>
                      <a href="http://www.ms800hub.rf.gd" target="_blank"><button className="btn btn-2">visit</button></a></li>
                    </ul>
                  </div></Col>
                </Row>
                <Row><Col><div className="proj-dtl"></div></Col></Row>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="proj">
                <Row>
                  <Col xl={6}><div className="proj-desc">
                    <h3>Aditya Automobiles</h3>
                    <p>A Maruti Suzuki authorised service center | Suzuki Arena</p>
                    <ul>
                      <li><span className="red">Client : </span>Aditya Automobiles</li>
                      <li><span className="red">Role : </span>Fullstack Dev., Google Business Mgmt.</li>
                      <li><span className="red">Product : </span>Website</li>
                      <li><span className="red">Tools : </span>Bootstrap, JS, PHP, mySQL</li>
                      <li className="text-right"><button className="btn btn-1" onClick={()=>{this.open('1');this.setState({value: 2});}} >more</button>
                      <a href="http://adityaautomobiles.rf.gd" target="_blank"><button className="btn btn-2">visit</button></a></li>
                    </ul>
                  </div></Col>
                <Col xl={6} className="text-center"><Image src={proj2} className="proj-img"/></Col>
                </Row>
                <Row><Col><div className="proj-dtl" ref={this.det2} style={{height:'0px',overflow:'hidden',transition:'2s ease'}}>
                  <p className="para">Aditya Automobiles is a Maruti Suzuki authorised service center. I made the website using Bootstrap, JS and php
                    The website is responsive and mobile friendly and has a beautiful frontend. I have hosted the website by myself.
                    It contains 2 views, Client side where user can book a service and Admin side where admins can manage the appointments.
                    The whole backend scene is created using PHP and JS.
                  </p>
                </div></Col></Row>
              </div>
            </Col>
          </Row>
          <Row><Col><h2 className="text-xl">Hobby Projects</h2></Col></Row>
          <Row  className="no-gutters">
            <Col xl={4} xs={12}><div className="proj2">
              <div className="proj-img2"><Image src={proj3} style={pi2}/></div>
              <div className="proj-desc2"><h5>Spotify ad-block</h5></div>
            </div></Col>
          </Row>
        </Container>
        <br/><br/>
    </section>
  );
}
}
export default Project;
