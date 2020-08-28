import React from 'react';
import { Container,Row,Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import CountUp from 'react-countup';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTerminal } from "@fortawesome/free-solid-svg-icons";
// import me from '../assets/images/imgMe.jpg';
import bgShape from '../assets/images/bg-shape.png';
import fgAvatar from '../assets/images/weeknd-bw.png';
import imgMe from '../assets/images/weeknd-2.png';
import branding from '../assets/images/branding.jpg';
// import webdev from '../assets/images/webdev.png';

// design images
import design1 from '../assets/images/designs/design1.jpg';
import design2 from '../assets/images/designs/design2.jpg';
import design3 from '../assets/images/designs/design3.jpg';
import design4 from '../assets/images/designs/design4.jpg';
import design5 from '../assets/images/designs/design5.jpg';
import design6 from '../assets/images/designs/design6.jpg';

class Body extends React.Component {
  componentDidMount(){
    this.setState({home: true});
  }
    render(){
      AOS.init({
        duration: 1000,
        once: true
    });
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 768, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
    return (
     <section className="content-wrap">
      <div>
        <Container fluid>
          <Row>
            <Col md={1}></Col>
              <Col md={6}>
                <div className="main-text" data-aos="fade-right">
                  <h1 className="text-xxl"> Hello<span className="red">.</span></h1>
                  <h2 className="text-xl"><span className="red">I am</span> Samartha</h2>
                  <Row>
                    <Col xs={2} className="text-right">
                      <h2 className="red" style={{fontSize:'3rem'}}><FontAwesomeIcon icon={faTerminal}/></h2>
                    </Col>
                    <Col xs={8}>
                      <ul className="list-a">
                        <li>Fullstack Developer &</li>
                        <li>Graphic Designer <span className="anim-blink red">|</span></li>
                      </ul>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col md={5}>
                <div className="image-con">
                  <div className="image-bg" data-aos="fade-left" data-aos-delay="200">
                    <Image src={bgShape}  alt={"yunghog"}/>
                  </div>
                  <div className="image-fg" data-aos="fade-left" data-aos-delay="600">
                    <Image src={fgAvatar}  alt={"yunghog"}/>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
          <br/><br/><br/>
          <Container>
            <Row>
              <Col md={8}>
                <div className="home-about cardy cell-left" data-aos="fade-right">
                  <p className="para">
                    <h3>About</h3>
                    Im a 21 yo freelance fullstack Developer, Graphic Designer and Music Producer based in Sagar.
                    I have experience in making websites, logo and poster designing .Im very passionate
                    and dedicated to my work. I have acquired the skills necessary to build great and premium websites.
                    I make beats when Im free :)
                    <br/><Link to='/about' className="red"><button className="btn btn-1">about</button></Link>
                  </p>
                </div>
              </Col>
              <Col md={3}>
                <div className="home-about-img cardy cell-right" data-aos="fade-left">
                  <Image src={imgMe} alt={"yunghog"}/>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={5} className="text-center">
                <div className="home-services-img cardy cell-left" data-aos="fade-left">
                  <Image src={branding} alt={"yunghog"}/>
                </div>
              </Col>
            <Col md={7}>
              <div className="home-about cardy cell-right" data-aos="fade-right">
                <h3>Services</h3>
                <ul>
                  {/*<li>Branding your business, which includes designing logo, flyers and creating website</li>*/}
                  <li>Creating websites using LAMP or MERN Stack technologies and hosting them</li>
                  <li>Graphic Designing, designing logo, posters, flyers, banners and also cover arts for album</li>
                </ul>
                <br/><Link to='/about' className="red"><button className="btn btn-1">services</button></Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={5}>
              <div className="cardy home-about home cell-left inverse" data-aos="fade-left">
                <h3>Short Information</h3>
                  <ul>
                    <li>Name : Samartha</li>
                    <li>Based in : Sagar, Shimoga</li>
                    <li>Mail : Samarthaog@gmail.com</li>
                    <li>Phone : +91 8904460742</li>
                  </ul>
              </div>
            </Col>
          </Row>
        </Container>
        <br/>
        <Container fluid style={{padding:'0px'}}>
          <Row xs={1} md={4} noGutters>
            <Col>
              <div className="proj-count" data-aos="fade-up">
                <h2 id="count"><CountUp end={20} duration={5}/>+</h2>
                <h5>Projects made</h5>
              </div>
            </Col>
            <Col>
              <div className="proj-count" data-aos="fade-up">
                <h2 id="count"><CountUp end={5} duration={5}/>+</h2>
                <h5>Happy Clients</h5>
              </div>
            </Col>
            <Col>
              <div className="proj-count" data-aos="fade-up">
                <h2 id="count"><CountUp end={100} duration={5}/>+</h2>
                <h5>Designs</h5>
              </div>
            </Col>
            <Col>
              <div className="proj-count" data-aos="fade-up">
                <h2 id="count"><CountUp end={5} duration={5}/>+</h2>
                <h5>Websites Hosted</h5>
              </div>
            </Col>
          </Row>
        </Container>
        <br/><br/>
        <Container fluid>
          <Row>
            <Col className="text-center"  data-aos="fade-up">
              <h3>Logo designed for clients</h3>
            </Col>
          </Row>
          <Row>
            <Col data-aos="fade-down">
              <Carousel responsive={responsive}
                autoPlay={true}
                autoPlaySpeed={2000}
                infinite={true}>
                <div className="car-img">
                  <Image src={design6} alt={"yunghog"}/>
                  <div className="design-overlay">
                    <h5>Logo for Astro Shankara</h5>
                  </div>
                </div>
                <div className="car-img">
                  <Image src={design5} alt={"yunghog"}/>
                    <div className="design-overlay">
                      <h5>Logo for Samnsady Customs</h5>
                    </div>
                </div>
                <div className="car-img">
                  <Image src={design3} alt={"yunghog"}/>
                    <div className="design-overlay">
                      <h5>Logo for MS800 Hub</h5>
                    </div>
                </div>
                <div className="car-img">
                  <Image src={design4} alt={"yunghog"}/>
                    <div className="design-overlay">
                      <h5>Logo for Insight Forum</h5>
                    </div>
                </div>
                <div className="car-img">
                  <Image src={design2} alt={"yunghog"}/>
                    <div className="design-overlay">
                      <h5>DP for my SoundCloud</h5>
                    </div>
                </div>
                <div className="car-img">
                  <Image src={design1} alt={"yunghog"}/>
                    <div className="design-overlay">
                      <h5>Logo for TechZone 2020</h5>
                    </div>
                </div>
              </Carousel>
            </Col>
          </Row>
        </Container>
          </div>
          <br/><br/>
        </section>
      );
    }
}

export default Body;
