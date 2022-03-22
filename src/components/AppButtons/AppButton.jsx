import React from 'react';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
import { CgArrowLongRightC } from 'react-icons/cg';
const AppButton = (props) => {
  if (props.type === BtnType.PRIMARY)
    return (
      <div className="btn-container" style={props.style}>
        <span className="btn-circle"></span>
        <button onClick={props.onClick} className={'btn btn-red'}>
          {props.name || props.children}
        </button>
        <CgArrowLongRightC className="btn-arrow" />
      </div>
    );
  else
    return (
      <button onClick={props.onClick} style={props.style} className={'btn btn-secondary'}>
        {props.name || props.children}
      </button>
    );
};
export default AppButton;
