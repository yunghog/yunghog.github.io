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
    document.getElementById('myHeader').style.display="none";
    document.getElementById('myFooter').style.display="none";
  }
  componentWillUnmount(){
    document.getElementById('myHeader').style.display="block";
    document.getElementById('myFooter').style.display="block";
  }
  render(){
    AOS.init({
      duration: 1000,
      once: true
    });
    const full_screen={
      textAlign: 'center',
      width: '100%',
      height: '100vh',
      display: 'flex',
      alignItems: 'center'
    }
    return (
      <section style={full_screen}>
        <div style={{alignSelf:'center',width:'100%'}} data-aos="fade-up">
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
