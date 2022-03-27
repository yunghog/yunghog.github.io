import React from 'react';
import '../../styles/style.css';
const ProjectPreview = (props) => {
  return (
    <div style={props.style} className="project-preview">
      {props.children}
    </div>
  );
};
const ProjectImage = (props) => {
  return <img src={props.src} alt={props.alt} style={props.style} className="project-image" />;
};
const ProjectData = (props) => {
  return (
    <div style={props.style} className="project-data">
      {props.children}
    </div>
  );
};
const ProjectMoreData = (props) => {
  return (
    <div style={props.style} className="project-more-data">
      {props.children}
    </div>
  );
};
export { ProjectData, ProjectImage, ProjectPreview, ProjectMoreData };
