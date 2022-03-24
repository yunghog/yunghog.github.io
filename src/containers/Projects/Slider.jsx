import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { Tab, TabNavigator } from 'src/components';
import '../../styles/style.css';
import { AppsSlide, Slide, WebSlide } from './Slide';
const ProjectSlider = (props) => {
  const [activeTab, setActiveTab] = useState(1);
  const isActiveTab = (index) => {
    if (index === activeTab) return true;
    else return false;
  };
  return (
    <Container fluid>
      <Row noGutters>
        <Col md={12}>
          <TabNavigator>
            <Tab name="Apps" active={isActiveTab(1)} onClick={() => setActiveTab(1)} />
            <Tab name="Web" active={isActiveTab(2)} onClick={() => setActiveTab(2)} />
          </TabNavigator>
        </Col>
      </Row>
      <Slide>
        {activeTab === 1 && <AppsSlide />}
        {activeTab === 2 && <WebSlide />}
      </Slide>
    </Container>
  );
};

export default ProjectSlider;
