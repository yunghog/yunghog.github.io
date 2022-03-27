import React from 'react';
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
      <HomeContainer style={styles.fullPage} id={'home'} />
      <AboutContainer style={styles.fullPage} id={'about'} />
      <ProjectContainer style={styles.fullPage} id={'projects'} />
      <ProcessContainer style={styles.fullPage} id={'process'} />
      <ContactContainer style={styles.fullPage} id={'contact'} />
    </>
  );
};
const SinglePage = (props) => {
  return <div style={window.innerWidth > 768 ? { minHeight: '100vh' } : {}}>{props.children}</div>;
};
const styles = {
  fullPage: {
    minHeight: window.innerWidth > 768 ? '100vh' : '0',
  },
};
export default HomeView;
