import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';

import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact, faNodeJs, faBootstrap, faJava, faJs, faPhp, faPython, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope  } from "@fortawesome/free-solid-svg-icons";

class About extends React.Component{
  constructor(props) {
      super(props);
      this.state={
        name: "",
        email: "",
        btn: "send mail!",
        query: ""
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

  handleChange(evt) {
     this.setState({ [evt.target.name]: evt.target.value });

  }
 handleSubmit(event) {
   alert(this.state);
   event.preventDefault();
   var params = {
      "reply_to": "Samartha",
      "from_name": this.state.name,
      "to_name": "Samartha",
      "from_email": this.state.email,
      "message_html": this.state.query
   }

   var service_id = "gmail";
   var template_id = "template_Mr3zPgLv";
   this.setState({btn: "sending....."});
  emailjs.send(service_id, template_id, params, 'user_9eCN0jEqX8MFrL7Pa1SiY')
  	.then(function(){
       alert("Sent!");
     }, function(err) {
       alert("Couldn't send email!\r\n Response:\n " + JSON.stringify(err));
    });
     this.setState({btn: "send mail!!",name:'',email:'',query:''});
 }

  render(){
    const icon={
      margin: '5px',
      color: '#e22',
      fontSize: '35px'
    };

    return (
          <section className="content-wrap fadeUp-anim">

            <div>
              <Container>
                <Row>
                  <Col>
                    <h1 className="text-xxl"> About<span className="red">.</span></h1>
                  </Col>
                </Row>
                <br/><br/>
                <Row>
                  <Col sm={8}>
                    <div className="home-about cardy cell-left">
                      <h3>Myself</h3>
                      <p className="para">My name is Samartha. Im from Sagar, Shimoga. At present im a final year Information Science
                        and Engineering student at Jawaharlal Nehru National
                      College of Engineering, Shimoga which is affilated to VTU.
                       I will graduate by 2021.</p>
                    </div>
                  </Col>
                </Row>
                <br/>
                <Row><Col><h3 className="text-center">Tools and Frameworks</h3></Col></Row><br/><br/>
                <Row>
                  <Col md={6}>
                    <div className="home-about cardy cell-left">
                      <h3>Web Development</h3>
                      <p className="para">Im familiar with MERN Stack (MongoDB, Express JS, React JS and Node JS),
                        LAMP (Linux, Apache, MySQL and PHPMyAdmin) and Wordpress. For static websites I use React JS
                      For dynamic websites most of the time I will go with LAMP. </p>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="home-about cardy cell-right">
                      <h3>Graphic Designing</h3>
                      <p className="para">For all types of graphic designing works I usee Adobe Photoshop only.</p>
                    </div>
                  </Col>
                </Row>
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
                <Row id="contact"><Col><h2 className="text-xl">Contact</h2></Col></Row>
                <Row>
                  <Col sm={8}>
                    <Row><Col><h5>Email</h5></Col></Row>
                    <Row><Col><form className="form-control2" onSubmit={this.handleSubmit}>
                      {/*<Row><Col><label>Name : </label></Col></Row>*/}
                      <Row><Col><input type="text" placeholder="Name" name="name" onChange={this.handleChange}></input></Col></Row>
                      <Row><Col><input type="text" placeholder="Email ID" name="email" onChange={this.handleChange}></input></Col></Row>
                      <Row><Col><textarea type="text" placeholder="Query" name="query"  onChange={this.handleChange}></textarea></Col></Row>
                      <Row><Col>   <input type="submit" value={this.state.btn} className="btn btn-1" /></Col></Row>
                    </form></Col></Row>
                  </Col>
                  <Col sm={4}>
                    <Row><Col><br/></Col></Row>
                    <Row><Col><a href="https://api.whatsapp.com/send?phone=918904460742" target="_blank"><FontAwesomeIcon icon={faWhatsapp} style={icon}></FontAwesomeIcon> <span style={icon}>/send text</span></a></Col></Row>
                    <Row><Col><a href="https://instagram.com/samartha__" target="_blank"><FontAwesomeIcon icon={faInstagram} style={icon}></FontAwesomeIcon> <span style={icon}>/samartha__</span></a></Col></Row>
                    <Row><Col><a href="mailto:samarthahm@gmail.com" target="_blank"><FontAwesomeIcon icon={faEnvelope} style={icon}></FontAwesomeIcon> <span style={icon}>/E-mail</span></a></Col></Row>
                  </Col>
                </Row>
                <br/>
                  <Row><Col sm={2}><h2 className="text-xl">Skills</h2></Col>
                      <Col sm={6}><FontAwesomeIcon icon={faBootstrap} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faReact} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faNodeJs} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faJava} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faPython} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faPhp} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faJs} style={icon}></FontAwesomeIcon></Col></Row>
                  <br/>
              </Container>
            </div>
          </section>
        );
      }
}
export default About;
