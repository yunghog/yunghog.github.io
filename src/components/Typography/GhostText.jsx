import React from 'react';
import '../../styles/style.css';

const GhostText = (props) => {
  return (
    <p className="ghost-text" style={props.style}>
      {props.children}
    </p>
  );
};
export default GhostText;
