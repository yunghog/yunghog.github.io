import React from 'react';
import { LinkType } from 'src/constants/enum.constants';
import '../../styles/style.css';
const Link = (props) => {
  if (props.type === LinkType.PRIMARY)
    return (
      <div className="link-container link-primary" style={props.style}>
        <a href={props.href} target={props.target} className="link-text">
          {props.children}
        </a>
        <span className="link-underline">.</span>
      </div>
    );
  else
    return (
      <div className="link-container" style={props.style}>
        <a href={props.href} target={props.target} className="link-text">
          {props.children}
        </a>
        <span className="link-underline"></span>
      </div>
    );
};
export default Link;
