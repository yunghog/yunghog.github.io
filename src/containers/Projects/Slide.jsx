import React, { createRef, useEffect, useState } from 'react';
import '../../styles/style.css';
import { CgArrowLongRightR, CgArrowLongLeftR } from 'react-icons/cg';
import {
  List,
  ListItem,
  ProjectData,
  ProjectImage,
  ProjectPreview,
  SliderButton,
  SubHeading,
} from 'src/components';
import { SliderBtnType } from 'src/constants/enum.constants';
const Slide = (props) => {
  const container = createRef(null);
  const slideRight = () => {
    if (container.current.scrollLeft <= container.current.offsetWidth) {
      container.current.scrollTo({
        top: 0,
        left: container.current.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };
  const slideLeft = () => {
    if (container.current.scrollLeft > 0) {
      container.current.scrollTo({
        top: 0,
        left: container.current.scrollLeft - 200,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="slider-container" ref={container}>
      {props.children}
      <span className="slider-btn-grp">
        <SliderButton onClick={() => slideLeft()}>
          <CgArrowLongLeftR />
        </SliderButton>
        <SliderButton type={SliderBtnType.RIGHT} onClick={() => slideRight()}>
          <CgArrowLongRightR />
        </SliderButton>
      </span>
    </div>
  );
};
const AppsSlide = (props) => {
  return (
    <div className="slides">
      <ProjectPreview style={styles.projectPreview}>
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Fgitstalkerapp%2Fapp-mockup.jpg?alt=media&token=4a83267c-ee56-4e5d-b953-5eee79fe6dd2"
          alt="weatherog app"
        />
        <ProjectData>
          <SubHeading>Gitstalker : Unofficial github client app</SubHeading>
          <List style={{ fontWeight: 'bold' }}>
            <ListItem>Desc : App Development</ListItem>
            <ListItem>Stack : Ionic, Angular, Firebase</ListItem>
          </List>
        </ProjectData>
      </ProjectPreview>
      <ProjectPreview style={styles.projectPreview}>
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Ftraptv%2Fapp-traptv.jpg?alt=media&token=a29678da-23d1-4cdb-976e-1bbfaaa8e7f1"
          alt="traptv app"
        />
        <ProjectData>
          <SubHeading>Trap Tv : Movie finding app</SubHeading>
          <List style={{ fontWeight: 'bold' }}>
            <ListItem>Desc : Website and App Development</ListItem>
            <ListItem>Stack : React JS, Firebase</ListItem>
          </List>
        </ProjectData>
      </ProjectPreview>
      <ProjectPreview style={styles.projectPreview}>
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Fweatherog%2Fwebversionshowcase.jpg?alt=media&token=f4e8fd04-34a0-4cb8-87e8-bdad57da298a"
          alt="weatherog app"
        />
        <ProjectData>
          <SubHeading>Weatherog : Weather forecasting app</SubHeading>
          <List style={{ fontWeight: 'bold' }}>
            <ListItem>Desc : Website and App Development</ListItem>
            <ListItem>Stack : React JS</ListItem>
          </List>
        </ProjectData>
      </ProjectPreview>
    </div>
  );
};
const WebSlide = (props) => {
  return (
    <div className="slides">
      <ProjectPreview>
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Fadityaaautomobiles%2Fhome.png?alt=media&token=fcb186f4-9064-4053-a565-62255852c69c"
          alt="Aditya automobiles website"
        />
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/aditya.png?alt=media&token=df808030-a629-44f6-ac27-a6f19a5d8c78"
          alt="Aditya automobiles website"
        />
        <ProjectData>
          <SubHeading>Aditya Automobiles : Website</SubHeading>
          <List style={{ fontWeight: 'bold' }}>
            <ListItem>Desc : Official website for a Mauti Suzuki arena in Sagar, Shimoga.</ListItem>
            <ListItem>Work : Website, Progressive Web Application, Logo Design</ListItem>
            <ListItem>Stack : PHP, MySQL</ListItem>
          </List>
        </ProjectData>
      </ProjectPreview>
      <ProjectPreview>
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/ms800hub.png?alt=media&token=4962ceea-30ea-45af-96d4-9fdd22e8ba31"
          alt="MS800Hub website"
        />
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Fms800hub%2Fprev%20(1).png?alt=media&token=aa62f890-fc7e-4000-b4e7-854a81e426d0"
          alt="MS800Hub website"
        />
        <ProjectImage
          src="https://firebasestorage.googleapis.com/v0/b/yunghogportfolio.appspot.com/o/projects%2Fms800hub%2Fprev%20(2).png?alt=media&token=677d7a05-3a06-43dd-9243-978e79e09560"
          alt="MS800Hub website"
        />
        <ProjectData>
          <SubHeading>MS800HUB : Website</SubHeading>
          <List style={{ fontWeight: 'bold' }}>
            <ListItem>Desc : Official website for MS800HUB. An automotive club.</ListItem>
            <ListItem>
              Work : Website, Progressive Web Application, Logo Design, Web hosting and maintainance
            </ListItem>
            <ListItem>Stack : PHP, MySQL</ListItem>
          </List>
        </ProjectData>
      </ProjectPreview>
    </div>
  );
};
const styles = {
  projectPreview: {
    // width: window.innerWidth <= 768 ? window.innerWidth - 150 + 'px' : '300px',
  },
  webView: {
    height: '60vh',
  },
};
export { AppsSlide, Slide, WebSlide };
