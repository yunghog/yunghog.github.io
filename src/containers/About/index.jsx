import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AppButton, GhostText, SubHeading, Text } from 'src/components';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
const AboutContainer = (props) => {
  return (
    <Container style={props.style}>
      <Row className="align-items-center">
        <Col md={{ span: 8 }}>
          <img
            className="p-2"
            width="100%"
            src="https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          />
        </Col>
        <Col md={{ span: 4 }}>
          <SubHeading>Who am I?</SubHeading>
          <GhostText>About</GhostText>
          <Text>
            My name is Samartha. Based in Sagar, Shimoga IN. I'm a freelance web developer and
            designer, who can work with a variety of clients and on many diverse projects. I work to
            create innovative solutions that inspire, and foster memorable relationships between
            brands and their clients. With a focus on UI/UX, I strive to create usable, beautiful
            and responsive websites. My aim is to create products with better interfaces and
            experience, making the web and mobile application easier and more pleasant to use. I
            like to take up challengin and interesting projects.
          </Text>
          <AppButton type={BtnType.PRIMARY} name={'Download cv'} />
        </Col>
      </Row>
    </Container>
  );
};
export default AboutContainer;
