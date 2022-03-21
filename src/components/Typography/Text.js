import React from 'react';
import '../../styles/style.css';
const Text = props => {
  return (
    <p className="paragraph" style={props.style}>
      {props.children}
    </p>
  );
};

export default Text;
