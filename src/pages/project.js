import React, {Component} from "react";
import { Container,Row,Col, Button, Image } from 'react-bootstrap';
import AOS from "aos";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/css/style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faReact, faNodeJs, faBootstrap, faJs, faPhp} from "@fortawesome/free-brands-svg-icons";
import ms800hub from '../assets/images/projects/ms800hub.jpg';
import ms800hubBg from '../assets/images/projects/ms800hubsiteui.jpg';
import ms800hubMock from '../assets/images/projects/ms800hubMockup.png';
import adityaAuto from '../assets/images/projects/adityaAuto.jpg';
import adityaAutoMockup from '../assets/images/projects/adityaAutoMockup.png';
import linkTree from '../assets/images/projects/linkTree.jpg';
import linkTreeMockup from '../assets/images/projects/linkTreeMockup.png';
import ProjectFullSection from '../assets/components/projectsFullPageSection';
class Project extends React.Component {
  constructor(props){
    super(props);
    this.state = {};
}
componentDidMount(){
  document.getElementById('myHeader').style.position="absolute";
}
handleScroll(){
  window.scroll({
  top: 700,
  left: 0,
  behavior: 'smooth'
});
}
render() {
  AOS.init({
    duration: 1000,
    once: true
});
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 1,
      slidesToSlide: 1 // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };
  const icon = {
    fontSize: '42px',
    padding: '5px'
  };
  var imageToggle=1
  function toggleLayer(e){
  console.log(e.target);
  if(imageToggle===0){
    e.target.style.zIndex="29";
    e.target.style.transform="scale(1)";
    imageToggle=1;
  }
  else{
    e.target.style.zIndex="40";
    e.target.style.transform="scale(1.2)";
    imageToggle=0;
  }

  }
  return (
    <div>
      <ProjectFullSection bgImage={ms800hubBg}/>
      <ProjectFullSection bgImage={adityaAuto}/>
      <ProjectFullSection bgImage={linkTree}/>
    </div>
  );
}
}
export default Project;
