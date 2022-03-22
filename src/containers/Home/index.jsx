import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  AppButton,
  Avatar,
  Heading,
  ScrollDownButton,
  SocialIcons,
  Socials,
  SocialTitle,
  SubHeading,
  Text,
} from 'src/components';
import { BtnType } from 'src/constants/enum.constants';
import { BsEnvelopeFill } from 'react-icons/bs';
import { Link } from 'src/components/Link';
const HomeContainer = (props) => {
  return (
    <Container id={props.id}>
      <Row className="center-phone">
        <Col className="title" md={{ size: 7, order: 'first' }} xs={{ order: 'last' }}>
          <Heading>Hi, I am Samartha,</Heading>
          <SubHeading>Designer and Developer</SubHeading>
          <Text className="text-left">
            Its not only about making something look good. I will help you to deliver high quality
            products and services which leads to better user experience and in turn, happier
            customers.
          </Text>
          <AppButton type={BtnType.PRIMARY} name={'Hire me'} />
          <br />
          <div className="switch-layout">
            <Socials>
              <SocialTitle>Contact Me</SocialTitle>
              <Link href="mailto:samarthaog@gmail.com">
                <BsEnvelopeFill /> samarthaog@gmail.com
              </Link>
            </Socials>
            <Socials>
              <SocialTitle>Follow Me</SocialTitle>
              <SocialIcons />
            </Socials>
          </div>
        </Col>
        <Col md={{ size: 5, order: 'last' }}>
          <Avatar style={{ width: '100%' }} />
        </Col>
      </Row>
      <ScrollDownButton
        style={
          window.innerWidth > 768
            ? { position: 'absolute', top: '50%', right: '0px' }
            : {
                position: 'absolute',
                top: window.innerHeight - 150 + 'px',
                left: window.innerWidth - 100 + 'px',
              }
        }
      />
    </Container>
  );
};

export default HomeContainer;
