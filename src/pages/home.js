import React from 'react';
import { Container,Row,Col, Image, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import Axios from 'axios';
import CountUp from 'react-countup';
import GitHubCalendar from 'react-github-calendar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.css'
import { FaTerminal, FaChevronCircleRight } from "react-icons/fa";
import bgShape from '../assets/images/bg-shape.png';
import fgAvatar from '../assets/images/weeknd-bw.png';
import emailjs from 'emailjs-com';

class Body extends React.Component {
  constructor(props){
    super(props)
    this.state={
      works: [],
      email: '',
      name: '',
      subject: '',
      query: '',
      sendStatus: ''
    }
  }
  handleInput = (evt) =>{
    this.setState({ [evt.target.name]: evt.target.value });
  }
  sendMail=()=>{
      const email= this.state.email;
      const name= this.state.name;
      const subject= this.state.subject;
      const query= this.state.query;

    var data = {
        from_name: name,
        from_email: email,
        message_html: query,
        subject: subject
    };
    emailjs.send('service_3cllilo', 'template_1n6ulhj', data, 'user_9eCN0jEqX8MFrL7Pa1SiY')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
      }
  getWorks=()=>{
    Axios.get('https://yunghogportfolio-default-rtdb.firebaseio.com/projects.json').then(res=>{
      const fetchedData = []
      for(let key in res.data){
        fetchedData.push({...res.data[key],_id:key})
      }
      this.setState({
        works: fetchedData,
      })
    })
  }
  componentDidMount(){
    this.getWorks();
  }
  render(){
    const works = this.state.works;
    return (
      <section>
          <Container fluid className="full-page-section">
            <Row noGutters>
              <Col md={7}>
                <div className="hero-con">
                  <h1 className="text-xxl">
                    HELLO !
                  </h1>
                  <h2 className="text-xl">
                    I'm
                    <span className=" px-2 text-primary">
                        Samartha
                    </span>
                  </h2>
                  <div className="sub-text">
                    <span className="dev-icon text-xxl text-primary">
                      <FaTerminal/>
                    </span>
                    <span>
                      <ul>
                        <li>Fullstack Developer</li>
                        <li>Graphic Designer
                            <span className="cursor"> | </span>
                        </li>
                      </ul>
                    </span>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="hero-img">
                  <img src={bgShape} className="blob" alt="yunghog"/>
                  <img src={fgAvatar} className="weeknd" alt="yunghog"/>
                </div>
              </Col>
            </Row>
          </Container>
          <Container className="full-page-section" id="service">
            <Row>
              <Col>
                <h2 className="text-xl">SERVICES<span className="text-primary">.</span></h2>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={4}>
                <div className="tile tab info-1">
                  <h3>Development</h3>
                  <ul>
                    <li>Website development</li>
                    <li>Progressive web app</li>
                    <li>Android app development</li>
                    <li>Frontend development</li>
                    <li>Domain registration</li>
                    <li>Web hosting</li>
                  </ul>
                </div>
              </Col>
              <Col md={4}>
                <div className="tile cright tab info-1">
                  <h3>Design</h3>
                  <ul>
                    <li>Flyer and poster design</li>
                    <li>Certificate design</li>
                    <li>Logo and card design</li>
                    <li>Banner</li>
                  </ul>
                </div>
              </Col>
            </Row>
            <Row className="justify-content-center">
              <Col md={8}>
                <div className="tile tab info-1">
                  <h3>Key features of my works</h3>
                  <ul>
                    <li>Development from scratch (I dont use themes)</li>
                    <li>Fine crafted User interface to achive seamless experience</li>
                    <li>Responsive UI design </li>
                    <li>Maintainance and quick delivery</li>
                    <li>Complementary design work</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid style={{padding:'0px'}} className="my-5">
            <Row xs={1} md={4} noGutters>
              <Col>
                <div className="countup">
                  <h2 id="count"><CountUp end={20} duration={5}/>+</h2>
                  <h5>Projects made</h5>
                </div>
              </Col>
              <Col>
                <div className="countup">
                  <h2 id="count"><CountUp end={5} duration={5}/>+</h2>
                  <h5>Happy Clients</h5>
                </div>
              </Col>
              <Col>
                <div className="countup">
                  <h2 id="count"><CountUp end={100} duration={5}/>+</h2>
                  <h5>Designs</h5>
                </div>
              </Col>
              <Col>
                <div className="countup">
                  <h2 id="count"><CountUp end={8} duration={5}/>+</h2>
                  <h5>Websites Hosted</h5>
                </div>
              </Col>
            </Row>
          </Container>

          <Container fluid className="full-page-section" id="work-sample">
            <Row noGutters>
              <Col>
                <h2 className="text-xl">Work Sample<span className="text-primary">.</span></h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <div className="work-sample-con">
                  <Carousel>
                    {works.map(work=>
                      <Carousel.Item key={work._id}>
                        <div className="work-sample">
                          <img src={work.prev} className="work-img" alt={work.title}/>
                          <div className="work-cap">
                            <p>{work.shortDesc}</p>
                            <h3>
                              {work.title}
                              <Link to={"/projects/"+work.code} className="px-2"><FaChevronCircleRight/></Link>
                            </h3>
                          </div>
                        </div>
                      </Carousel.Item>
                    )}
                  </Carousel>
                </div>
              </Col>
            </Row>
          </Container>

          <Container className="full-page-section" id="about">
            <Row>
              <Col>
                <h2 className="text-xl">About</h2>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <div className="tile inverse p-3">
                  <h3>Short Information</h3>
                  <ul>
                    <li>Name: Samartha</li>
                    <li>Based in: Sagar, Shimoga.IN</li>
                    <li>Mail: <a href="mailto:samarthaog@gmail.com">Samarthaog@gmail.com</a></li>
                  </ul>
                  <div className="text-right">
                    <a className="btn btn-light text-dark" href="https://yunghog.github.io/link-tree" target="_blank" rel="noopner">Link Tree</a>
                  </div>
                </div>
                <br/>
                <div className="tile">
                  <h3>About Me</h3>
                  <p>
                    Im a 21 yo freelance fullstack Developer, Graphic Designer and Music Producer based in Sagar. I have experience in making
                    websites, logo and poster designing .Im very passionate and dedicated to my work. I have acquired the skills necessary to
                    build great and premium websites. I make beats when Im free.
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <div className="tile cright">
                  <h3>My work</h3>
                  <p>
                    I'm a freelance web developer and designer, who can work with a variety of clients and on many diverse projects.
                    I work to create innovative solutions that inspire, and foster memorable relationships between brands and their
                    clients. With a focus on UI/UX, I strive to create usable, beautiful and responsive websites.
                  </p>
                </div>
                <br/>
                <div className="tile tab">
                  <h3>My skills</h3>
                  <h4>Languages and frameworks</h4>
                  <ul className="skills">
                    <li>Node JS</li>
                    <li>react js</li>
                    <li>angular</li>
                    <li>ionic</li>
                    <li>php</li>
                    <li>bootstrap</li>
                    <li>material css</li>
                    <li>java</li>
                    <li>python</li>
                    <li>c,c++</li>
                  </ul>
                  <h4>Tools</h4>
                  <ul className="skills">
                    <li>git</li>
                    <li>npm</li>
                    <li>mongo db</li>
                    <li>mysql</li>
                    <li>firebase</li>
                    <li>android studio</li>
                    <li>photoshop</li>
                    <li>figma</li>
                  </ul>
                </div>
              </Col>
            </Row>
          </Container>
          <br/>
          <Container className="inverse full-page-section" fluid id="contact">
            <Row>
              <Col md={{span:'11',offset:'1'}}>
                <h2 className="text-xl mt-5">Get in touch</h2>
              </Col>
            </Row>
            <Row>
              <Col md={{span:'7',offset:'1'}}>
                <h3 className="mb-5">Contact Form</h3>
                <p>Do you want to hire me? Do you have an idea and want to turn it into reality? Have anything to ask. Feel free to contact me.</p>
                <form className="form-ctrl-email">
                  <Row>
                    <Col md={6}>
                      <div className="form-row">
                        <label className={this.state.name===''?"":"float"}>Name</label>
                        <input name="name" type="text" placeholder="" onChange={this.handleInput}/>
                      </div>
                    </Col>
                    <Col md={6}>
                      <div className="form-row">
                        <label className={this.state.email===''?"":"float"}>Email</label>
                        <input name="email" type="email" placeholder="" onChange={this.handleInput}/>
                      </div>
                    </Col>
                  </Row>
                  <div className="form-row">
                    <label className={this.state.subject===''?"":"float"}>Subject</label>
                    <input name="subject" type="text" placeholder="" onChange={this.handleInput}/>
                  </div>
                  <div className="form-row">
                    <textarea name="query" type="text" placeholder="query" onChange={this.handleInput} rows="3"></textarea>
                  </div>
                  <button className="btn btn-light btn-block mb-2" type="button" onClick={this.sendMail}>Send Mail</button>
                </form>
              </Col>
              <Col md={{span:'3'}}>

              </Col>
            </Row>
          </Container>
      </section>
    );
  }
}

export default Body;
