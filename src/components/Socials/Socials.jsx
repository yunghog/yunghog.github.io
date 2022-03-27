import React from 'react';
import '../../styles/style.css';
import { BsInstagram, BsLinkedin, BsGithub } from 'react-icons/bs';
const Socials = (props) => {
  return (
    <div className="social-container" style={props.style}>
      {props.children}
    </div>
  );
};
const SocialTitle = (props) => {
  return (
    <p className="social-title" style={props.style}>
      {props.children}
    </p>
  );
};

const SocialIcons = (props) => {
  return (
    <span className="social-icons" style={props.style}>
      <a href="https://github.com/yunghog" target={'_blank'}>
        <BsGithub />
      </a>
      <a href="https://www.linkedin.com/in/samartha-hm-7398861a1/" target={'_blank'}>
        <BsLinkedin />
      </a>
      <a href="https://www.instagram.com/samartha__/" target={'_blank'}>
        <BsInstagram />
      </a>
    </span>
  );
};
export { SocialIcons, SocialTitle, Socials };
