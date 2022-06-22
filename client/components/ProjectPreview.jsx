import React from 'react';

const ProjectPreview = props => (
    <button id={props.index} onClick={props.clickHandler}>{props.projectName}</button>
  );
  
export default ProjectPreview;