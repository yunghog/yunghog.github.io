import React from 'react';
import '../css/style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCss3, faAngular, faHtml5,  faReact, faNodeJs, faBootstrap, faJs, faPhp, faGitAlt, faBitbucket, faInstagram, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope ,faAtom } from "@fortawesome/free-solid-svg-icons";

class Skills extends React.Component{
  constructor(props) {
      super(props);
      this.state={
      };
    }
componentDidMount(){
}
  render(){
    const icon={
      margin: '5px',
      fontSize: '35px'
    };
    return (
      <div>
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
        <div style={{display:this.props.tools}}>
          <h3>Tools</h3>
          <p><FontAwesomeIcon icon={faAtom} style={icon}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faGitAlt} style={icon}></FontAwesomeIcon>
          <FontAwesomeIcon icon={faBitbucket} style={icon}></FontAwesomeIcon></p>
        </div>
      </div>
        );
      }
}
export default Skills;
