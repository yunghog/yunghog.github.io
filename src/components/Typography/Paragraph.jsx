import React from 'react';
import '../../styles/style.css';
const Paragraph = props => {
  return (
    <p className="paragraph" style={props.style}>
      {props.children}
    </p>
  );
};

export default Paragraph;
