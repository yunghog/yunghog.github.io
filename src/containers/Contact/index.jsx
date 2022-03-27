import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  AppButton,
  GhostText,
  MessageBox,
  SocialIcons,
  SubHeading,
  Text,
  Textarea,
  Textbox,
} from 'src/components';
import { BtnType, MessageBoxType, ValidationType } from 'src/constants/enum.constants';
import { EmailService } from 'src/services';
import '../../styles/style.css';
import validation from './helper';
import { CgArrowLongUpC } from 'react-icons/cg';
const ContactContainer = (props) => {
  const [messageBox, setMessageBox] = useState({
    message: '',
    type: null,
  });
  const [emailData, setEmailData] = useState({
    name: '',
    email: '',
    query: '',
  });
  const sendMail = () => {
    if (
      validation(ValidationType.NAME, emailData.name) &&
      validation(ValidationType.EMAIL, emailData.email) &&
      validation(ValidationType.MESSAGE, emailData.query)
    ) {
      EmailService.sendMail(emailData).then((res) => {
        if (res.status === 200)
          setMessageBox({
            message: 'Email has been sent. We will respond to your email asap',
            type: MessageBoxType.SUCCESS,
          });
        else setMessageBox({ message: "Couldn't send the mail", type: MessageBoxType.ERROR });
      });
    } else
      setMessageBox({
        message: 'Please enter valid details in the email form',
        type: MessageBoxType.ERROR,
      });
    setEmailData({ ...emailData, name: '', query: '', email: '' });
  };
  return (
    <Container id={props.id} className="py-5" style={{ position: 'relative' }}>
      <Row>
        <Col md={{ span: 4, offset: 8 }} data-aos="fade-up">
          <SubHeading>
            Lets talk
            <GhostText>Contact</GhostText>
          </SubHeading>
        </Col>
      </Row>
      <br />
      <Row>
        <Col
          md={{ span: 5, offset: 1 }}
          style={styles.softbox}
          data-aos="fade-up"
          data-aos-delay="500"
        >
          <SubHeading>EMAIL</SubHeading>
          <br />
          <Textbox
            type={'text'}
            style={{ marginBottom: '20px' }}
            label={'Name'}
            onChange={(event) => setEmailData({ ...emailData, name: event.target.value })}
            active={emailData.name.length > 0 ? 1 : 0}
            value={emailData.name}
          />
          <Textbox
            type={'email'}
            style={{ marginBottom: '20px' }}
            label={'Email ID'}
            onChange={(event) => setEmailData({ ...emailData, email: event.target.value })}
            active={emailData.name.length > 0 ? 1 : 0}
            value={emailData.email}
          />
          <Textarea
            rows={5}
            style={{ marginBottom: '20px' }}
            label={'Query'}
            onChange={(event) => setEmailData({ ...emailData, query: event.target.value })}
            active={emailData.query.length > 0 ? 1 : 0}
            value={emailData.query}
          />
          <AppButton type={BtnType.PRIMARY} onClick={() => sendMail()} name={'sendmail'} />
        </Col>
        <Col
          md={{ span: 3, offset: 1 }}
          className="py-3"
          data-aos="fade-right"
          data-aos-delay="1000"
        >
          <Softbox>
            <Text style={{ fontWeight: 'bold' }}>CONTACT ME</Text>
            <Text>
              Let's talk about our next project. I am sure you already have few ideas in mind. Let's
              connect and talk about it
            </Text>
          </Softbox>
          <br />
          <Softbox>
            <Text style={{ fontWeight: 'bold' }}>FOLLOW ME</Text>
            <SocialIcons />
          </Softbox>
        </Col>
      </Row>
      {messageBox.message !== '' && (
        <MessageBox
          type={messageBox?.type}
          message={messageBox?.message}
          onClick={() => setMessageBox({ message: '', type: null })}
        />
      )}
      <div className="text-right">
        <button
          style={styles.scrollBtn}
          onClick={() => window.scroll({ top: 0, left: 0, behaviour: 'smooth' })}
        >
          <CgArrowLongUpC />
        </button>
      </div>
    </Container>
  );
};
const Softbox = (props) => {
  return <div style={{ ...props.style, ...styles.softbox }}>{props.children}</div>;
};
const styles = {
  softbox: {
    padding: '30px',
    borderRadius: '20px',
    boxShadow: '5px 5px 20px #5553',
  },
  scrollBtn: {
    backgroundColor: 'var(--red)',
    borderRadius: '25%',
    border: 'none',
  },
};
export default ContactContainer;
