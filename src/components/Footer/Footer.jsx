import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Text } from '../';
import '../../styles/style.css';
const AppFooter = (props) => {
  return (
    <footer style={props.style} className="app-footer">
      <Container>
        <Row>
          <Col className="text-center">
            <Text style={{ fontWeight: 'bold', color: 'var(--light)' }}>
              Created by Samartha. 2022
            </Text>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
export default AppFooter;
