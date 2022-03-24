import React, { useEffect } from 'react';
import { AboutContainer, HomeContainer, ProcessContainer, ProjectContainer } from 'src/containers';
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
    </>
  );
};
const SinglePage = (props) => {
  return <div style={window.innerWidth > 768 ? { minHeight: '100vh' } : {}}>{props.children}</div>;
};

export default HomeView;
