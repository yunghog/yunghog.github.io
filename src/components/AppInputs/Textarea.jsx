import React, { useEffect, useRef, useState } from 'react';
import '../../styles/style.css';
const Textarea = (props) => {
  const container = useRef();
  const inputbox = useRef();
  const [active, setActive] = useState(false);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    container.current.addEventListener('mouseover', () => setActive(true));
    container.current.addEventListener('mouseout', () => setActive(false));
    inputbox.current.addEventListener('focus', () => setFocused(true));
    inputbox.current.addEventListener('blur', () => setFocused(false));
  }, []);
  return (
    <div ref={container} className="textbox-container" style={props.style}>
      <textarea
        type={props.type}
        rows={props.rows}
        cols={props.cols}
        ref={inputbox}
        active={props.active}
        value={props.value}
        onChange={props.onChange}
        className={focused ? 'textbox textbox-active' : 'textbox'}
      ></textarea>
      <span className={props.active || active ? 'textbox-label active-label' : 'textbox-label'}>
        {props.label}
      </span>
    </div>
  );
};
export default Textarea;
