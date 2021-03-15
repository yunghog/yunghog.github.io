import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import AOS from 'aos';
import '../assets/css/style.css';
import CountUp from 'react-countup';
class About extends React.Component{
  constructor(props) {
    super(props);
    this.state={};
  }
  componentDidMount(){
  }
  render(){
    AOS.init({
      duration: 1000,
      once: true
    });
    const full_screen={
      width: '100%',
      height: '100vh',
      paddingTop: '10%',
      textAlign: 'center'
    }
    return (
      <section style={full_screen} className="content-wrap">
        <div className="" data-aos="fade-up">
          <h1 className="text-xxl" id="count"><CountUp end={404} duration={1}/></h1>
          <h5>Oops! page not found</h5>
          <div>
            <Link style={{color:'#fff'}} to="/" className="btn btn-1">go to HOME</Link>
          </div>
        </div>
      </section>
    );
  }
}
export default About;
