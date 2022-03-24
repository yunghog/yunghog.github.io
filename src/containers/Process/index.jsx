import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import {
  GhostText,
  ProcessCard,
  ProcessCardItem,
  ProcessImage,
  SubHeading,
  Text,
} from 'src/components';
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
      <br />
      <ProcessCard>
        <ProcessCardItem xs={{ span: 5 }} md={{ span: 2, offset: 4 }}>
          <ProcessImage
            src={
              'https://images.pexels.com/photos/416405/pexels-photo-416405.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
          />
        </ProcessCardItem>
        <ProcessCardItem md={{ span: 3 }} xs={{ span: 7 }}>
          <SubHeading>Briefing</SubHeading>
          <GhostText>01</GhostText>
          <Text>
            Understanding your values, product, goals, target audience, requirements and deadline
          </Text>
        </ProcessCardItem>
      </ProcessCard>
      <ProcessCard>
        <ProcessCardItem md={{ span: 3, offset: 3 }} xs={{ span: 7 }}>
          <SubHeading>Research</SubHeading>
          <GhostText>02</GhostText>
          <Text>Competitive analysis, user research, analytics and customer journey map</Text>
        </ProcessCardItem>
        <ProcessCardItem xs={{ span: 5 }} md={{ span: 2 }}>
          <ProcessImage
            src={
              'https://images.pexels.com/photos/5485889/pexels-photo-5485889.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
          />
        </ProcessCardItem>
      </ProcessCard>
      <ProcessCard>
        <ProcessCardItem xs={{ span: 5 }} md={{ span: 2, offset: 4 }}>
          <ProcessImage
            src={
              'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
          />
        </ProcessCardItem>
        <ProcessCardItem md={{ span: 3 }} xs={{ span: 7 }}>
          <SubHeading>Prototype</SubHeading>
          <GhostText>03</GhostText>
          <Text>
            First glimpse of how the project may look like. Structure and logic.After ypour
            approval, it goes for design and development
          </Text>
        </ProcessCardItem>
      </ProcessCard>
      <ProcessCard>
        <ProcessCardItem md={{ span: 3, offset: 3 }} xs={{ span: 7 }}>
          <SubHeading>Design and Development</SubHeading>
          <GhostText>04</GhostText>
          <Text>
            Where the magic happens. Final appearance of the product. If the client is happy with
            the product then it goes for production.
          </Text>
        </ProcessCardItem>
        <ProcessCardItem xs={{ span: 5 }} md={{ span: 2 }}>
          <ProcessImage
            src={
              'https://images.pexels.com/photos/326501/pexels-photo-326501.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            }
          />
        </ProcessCardItem>
      </ProcessCard>
    </Container>
  );
};
export default ProcessContainer;
