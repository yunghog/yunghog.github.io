import React from 'react';
import '../../styles/style.css';

const GhostText = (props) => {
  return (
    <h2 className="ghost-text" style={props.style}>
      {props.children}
    </h2>
  );
};
export default GhostText;
