import React from 'react';
import { SliderBtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
const SliderButton = (props) => {
  return (
    <div style={props.style} className="btn-slider-container">
      <button
        onClick={props.onClick}
        className={props.type === SliderBtnType.RIGHT ? 'btn-slider-right' : 'btn-slider'}
      >
        {props.name || props.children}
      </button>
      <span className="btn-slider-circle">.</span>
    </div>
  );
};
export default SliderButton;
