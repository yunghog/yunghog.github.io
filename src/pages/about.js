import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import emailjs from 'emailjs-com';
import AOS from 'aos';
import '../assets/css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3, faAngular, faHtml5,  faReact, faNodeJs, faBootstrap, faJs, faPhp, faGitAlt, faBitbucket, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope ,faAtom } from "@fortawesome/free-solid-svg-icons";

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
      fontSize: '35px'
    };
    AOS.init({
      duration: 1000,
      once: true
  });
    return (
          <section className="content-wrap fadeUp-anim">
            <div>
              <Container>
                <Row>
                  <Col data-aos="fade-up">
                    <h1 className="text-xxl"> About<span className="red">.</span></h1>
                    <h3>Creative | Passionate | Focused</h3>
                  </Col>
                </Row>
                <br/><br/><br/>
                <Row>
                  <Col sm={6}>
                    <div className="home-about cardy cell-left" data-aos="fade-right">
                      <h3>Myself</h3>
                      <p className="para">My name is Samartha. Im from Sagar, Shimoga. At present im a final year Information Science
                        and Engineering student at Jawaharlal Nehru National
                      College of Engineering, Shimoga which is affilated to VTU.
                       I will graduate by 2021.</p>
                    </div>
                  </Col>
                  <Col sm={6}>
                    <div className="home-about cardy cell-right" data-aos="fade-left">
                      <p className="para">I'm a freelance web developer and designer, who can work with a variety of clients
                        and on many diverse projects. I work to create innovative solutions that inspire, and foster memorable relationships
                         between brands and their clients. With a focus on UI/UX, I strive to create usable, beautiful and responsive websites.</p>
                    </div>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col md={4}>
                    <div className="home-about cardy cell-left inverse">
                      <h3>Frameworks</h3>
                      <p><FontAwesomeIcon icon={faBootstrap} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faReact} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faNodeJs} style={icon}></FontAwesomeIcon>
                      <FontAwesomeIcon icon={faAngular} style={icon}></FontAwesomeIcon></p>
                      <h3>Languages</h3>
                        <p><FontAwesomeIcon icon={faCss3} style={icon}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faHtml5} style={icon}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faJs} style={icon}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faPhp} style={icon}></FontAwesomeIcon></p>
                          <h3>Tools</h3>
                            <p><FontAwesomeIcon icon={faAtom} style={icon}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faGitAlt} style={icon}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faBitbucket} style={icon}></FontAwesomeIcon>
                            <FontAwesomeIcon icon={faPhp} style={icon}></FontAwesomeIcon></p>
                    </div>
                  </Col>
                  <Col md={8}>
                    <div className="home-about cardy cell-right">
                      <h3>Contact</h3>
                        <Row><Col><form className="form-control2" onSubmit={this.handleSubmit}>
                          {/*<Row><Col><label>Name : </label></Col></Row>*/}
                          <Row><Col><input type="text" placeholder="Name" name="name" onChange={this.handleChange}></input></Col></Row>
                          <Row><Col><input type="text" placeholder="Email ID" name="email" onChange={this.handleChange}></input></Col></Row>
                          <Row><Col><textarea type="text" placeholder="Query" name="query"  onChange={this.handleChange}></textarea></Col></Row>
                          <Row><Col>   <input type="submit" value={this.state.btn} className="btn btn-1" /></Col></Row>
                        </form></Col></Row>
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
                      <h3>Contact</h3>
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

                  </Col>
                  <Col sm={4}>
                    <Row><Col><br/></Col></Row>
                    <Row><Col><a href="https://api.whatsapp.com/send?phone=918904460742" target="_blank"><FontAwesomeIcon icon={faWhatsapp} style={icon}></FontAwesomeIcon> <span style={icon}>/send text</span></a></Col></Row>
                    <Row><Col><a href="https://instagram.com/samartha__" target="_blank"><FontAwesomeIcon icon={faInstagram} style={icon}></FontAwesomeIcon> <span style={icon}>/samartha__</span></a></Col></Row>
                    <Row><Col><a href="mailto:samarthahm@gmail.com" target="_blank"><FontAwesomeIcon icon={faEnvelope} style={icon}></FontAwesomeIcon> <span style={icon}>/E-mail</span></a></Col></Row>
                  </Col>
                </Row>
              </Container>
            </div>
          </section>
        );
      }
}
export default About;
