import React from 'react';
import '../../styles/style.css';
const List = (props) => {
  return (
    <ul style={props.style} className="list-primary">
      {props.children}
    </ul>
  );
};
const ListItem = (props) => {
  return (
    <div className="list-item-primary">
      <li>{props.children}</li>
      <p>{props.num}</p>
    </div>
  );
};
export default List;
export { ListItem };
