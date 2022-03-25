import React, { useEffect } from 'react';
import { AppFooter } from 'src/components/Footer';
import {
  AboutContainer,
  ContactContainer,
  HomeContainer,
  ProcessContainer,
  ProjectContainer,
} from 'src/containers';
const HomeView = (props) => {
  return (
    <>
      <SinglePage>
        <HomeContainer />
      </SinglePage>
      <SinglePage>
        <AboutContainer />
      </SinglePage>
      <SinglePage>
        <ProjectContainer />
      </SinglePage>
      <SinglePage>
        <ProcessContainer />
      </SinglePage>
      <SinglePage>
        <ContactContainer />
      </SinglePage>
      <AppFooter />
    </>
  );
};
const SinglePage = (props) => {
  return <div style={window.innerWidth > 768 ? { minHeight: '100vh' } : {}}>{props.children}</div>;
};

export default HomeView;
