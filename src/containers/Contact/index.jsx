import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  AppButton,
  GhostText,
  SocialIcons,
  SubHeading,
  Text,
  Textarea,
  Textbox,
} from 'src/components';
import { BtnType } from 'src/constants/enum.constants';
import '../../styles/style.css';
const ContactContainer = (props) => {
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    query: '',
  });
  const sendMail = () => {
    console.log(emailData);
  };
  return (
    <Container className="pt-5">
      <Row>
        <Col md={{ span: 4, offset: 8 }}>
          <SubHeading>
            Lets talk
            <GhostText>Contact</GhostText>
          </SubHeading>
        </Col>
      </Row>
      <br />
      <Row>
        <Col md={{ span: 5, offset: 1 }} style={styles.softbox}>
          <SubHeading>EMAIL</SubHeading>
          <br />
          <Textbox
            style={{ marginBottom: '20px' }}
            label={'Name'}
            onChange={(event) => setEmailData({ ...emailData, name: event.target.value })}
            active={emailData.name.length > 0}
          />
          <Textbox
            style={{ marginBottom: '20px' }}
            label={'Email ID'}
            onChange={(event) => setEmailData({ ...emailData, email: event.target.value })}
            active={emailData.name.length > 0}
          />
          <Textarea
            rows={5}
            style={{ marginBottom: '20px' }}
            label={'Query'}
            onChange={(event) => setEmailData({ ...emailData, query: event.target.value })}
            active={emailData.query.length > 0}
          />
          <AppButton type={BtnType.PRIMARY} onClick={() => sendMail()} name={'sendmail'} />
        </Col>
        <Col md={{ span: 3, offset: 1 }} className="py-3">
          <Text style={{ fontWeight: 'bold' }}>CONTACT ME</Text>
          <Text>
            Let's talk about our next project. I am sure you already have few ideas in mind. Let's
            connect and talk about it
          </Text>
          <br />
          <Text style={{ fontWeight: 'bold' }}>FOLLOW ME</Text>
          <SocialIcons />
        </Col>
      </Row>
    </Container>
  );
};
const styles = {
  softbox: {
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '0 0 20px #5553',
  },
};
export default ContactContainer;
