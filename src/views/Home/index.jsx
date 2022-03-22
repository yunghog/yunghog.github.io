import React, { useEffect } from 'react';
import { AboutContainer, HomeContainer } from 'src/containers';
const HomeView = (props) => {
  return (
    <>
      <SinglePage>
        <HomeContainer />
      </SinglePage>
      <SinglePage>
        <AboutContainer />
      </SinglePage>
    </>
  );
};
export default HomeView;
const styles = {
  centerVertically: { minHeight: '100vh', display: 'inline-flex', alignItem: 'center' },
};
const SinglePage = (props) => {
  return <div style={{ minHeight: '100vh' }}>{props.children}</div>;
};
