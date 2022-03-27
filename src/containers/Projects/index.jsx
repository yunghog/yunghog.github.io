import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GhostText, SubHeading } from 'src/components';
import '../../styles/style.css';
import ProjectSlider from './Slider';
const ProjectContainer = (props) => {
  return (
    <Container id={props.id} style={props.style} className="pt-5">
      <Row>
        <Col md={{ span: 6, offset: 6 }} data-aos="fade-right">
          <SubHeading>Selected works</SubHeading>
          <GhostText>Projects</GhostText>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10 }} data-aos="slide-right" data-aos-delay="500">
          <ProjectSlider />
        </Col>
      </Row>
    </Container>
  );
};
export default ProjectContainer;
