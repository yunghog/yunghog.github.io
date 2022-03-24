import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { GhostText, SubHeading } from 'src/components';
import '../../styles/style.css';
const ProcessContainer = (props) => {
  return (
    <Container className="pt-5">
      <Row>
        <Col>
          <SubHeading>
            How I do?
            <GhostText>Process</GhostText>
          </SubHeading>
        </Col>
      </Row>
    </Container>
  );
};
export default ProcessContainer;
