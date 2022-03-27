import React from 'react';
import '../../styles/style.css';
const TabNavigator = (props) => {
  return (
    <div style={props.style} className="tab-navigator">
      {props.children}
    </div>
  );
};
export default TabNavigator;
export { Tab };
const Tab = (props) => {
  return (
    <button
      style={props.style}
      className={props.active ? 'tab-btn active-tab-btn' : 'tab-btn'}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
};
