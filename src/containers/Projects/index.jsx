import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GhostText, SubHeading } from 'src/components';
import '../../styles/style.css';
import ProjectSlider from './Slider';
const ProjectContainer = (props) => {
  return (
    <Container className="pt-5">
      <Row>
        <Col md={{ span: 6, offset: 6 }}>
          <SubHeading>Selected works</SubHeading>
          <GhostText>Projects</GhostText>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 10 }}>
          <ProjectSlider />
        </Col>
      </Row>
    </Container>
  );
};
export default ProjectContainer;
