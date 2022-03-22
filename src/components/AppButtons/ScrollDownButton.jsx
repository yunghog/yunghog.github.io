import React from 'react';
import '../../styles/style.css';
import { CgArrowLongRight } from 'react-icons/cg';
const ScrollDownButton = (props) => {
  return (
    <span className="scroll-down-btn" style={props.style}>
      <p>scroll down</p>
      <span>.</span>
      <CgArrowLongRight className="scroll-down-arrow" />
    </span>
  );
};
export default ScrollDownButton;
