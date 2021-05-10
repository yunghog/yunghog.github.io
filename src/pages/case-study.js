import React, {Component} from 'react'
import {Row, Col, Container} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import AOS from 'aos';
import '../assets/css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { } from "@fortawesome/free-brands-svg-icons";
import { } from "@fortawesome/free-solid-svg-icons";
import {projects} from '../assets/documents/projects'
class CaseStudy extends React.Component{
  constructor(props){
    super(props);
    this.state={
      proj: ''
    }
    this.getProj=this.getProj.bind(this)
  }
    componentDidMount(){
      this.setState({
        proj: this.getProj()
      })
    }
    getProj(){
      for(var i=0; i<projects.length;i++){
        if(projects[i].proj==this.props.match.params.proj){
          return(projects[i]);
        }
      }
    }

    render(){
      return(
        <div>
        {this.state.proj.title}
        </div>
      )
    }
}
export default CaseStudy;
