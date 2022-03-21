import React from 'react';
import '../../styles/style.css';
const SubHeading = props => {
  return (
    <h3 className="sub-heading" style={props.style}>
      {props.children}
    </h3>
  );
};

export default SubHeading;
