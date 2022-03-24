import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import '../../styles/style.css';
const ProcessCard = (props) => {
  return <Row className="py-3">{props.children}</Row>;
};
const ProcessCardItem = (props) => {
  return (
    <Col style={props.style} xs={props.xs} md={props.md}>
      {props.children}
    </Col>
  );
};
const ProcessImage = (props) => {
  return (
    <div style={props.style} className="proc-img">
      <div className="proc-img-crop">
        <img src={props.src} alt={props.alt} />
      </div>
      <span className="proc-img-circle">.</span>
    </div>
  );
};
export { ProcessCard, ProcessCardItem, ProcessImage };
