import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { AppButton, GhostText, List, ListItem, SubHeading, Text } from 'src/components';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
const AboutContainer = (props) => {
  return (
    <Container style={props.style} className="pt-5">
      <Row>
        <Col md={{ span: 6, offset: 2 }} xs={{ span: 10 }}>
          <SubHeading>Who am I?</SubHeading>
          <GhostText>About</GhostText>
          <Text>
            My name is Samartha. Based in Sagar, Shimoga IN. I'm a freelance web developer and
            designer, who can work with a variety of clients and on many diverse projects. I work to
            create innovative solutions that inspire, and foster memorable relationships between
            brands and their clients. With a focus on UI/UX, I strive to create usable, beautiful
            and responsive websites. My aim is to create products with better interfaces and
            experience, making the web and mobile application easier and more pleasant to use. I
            like to take up challenging and interesting projects.
          </Text>
          <AppButton type={BtnType.PRIMARY} name={'Download cv'} />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 6 }} xs={{ span: 10, offset: 2 }}>
          <SubHeading>What I can do</SubHeading>
          <GhostText>Service</GhostText>
          <List>
            <ListItem num={'01'}>Website and Web application development</ListItem>
            <ListItem num={'02'}>Mobile Application development</ListItem>
            <ListItem num={'03'}>Web hosting and maintainance</ListItem>
            <ListItem num={'04'}>Poster and Flyer design</ListItem>
          </List>
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 5, offset: 2 }} xs={{ span: 10 }}>
          <SubHeading>My Tech stack</SubHeading>
          <GhostText>SKILLS</GhostText>
          <List>
            <ListItem num={'Frontend'}>React JS, Ionic, React-Native</ListItem>
            <ListItem num={'Backend'}>Node JS, MongoDB, Firebase</ListItem>
            <ListItem num={'Design'}>Adobe Photoshop, Figma</ListItem>
          </List>
        </Col>
      </Row>
    </Container>
  );
};
export default AboutContainer;
