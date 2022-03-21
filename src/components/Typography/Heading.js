import React from 'react';
import '../../styles/style.css';
const Heading = props => {
  return (
    <h1 className="heading" style={props.style}>
      {props.children}
    </h1>
  );
};

export default Heading;
