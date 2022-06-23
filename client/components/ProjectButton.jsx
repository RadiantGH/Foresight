import React from 'react';

const ProjectButton = props => (
    <button className='project-button' id={props.index} onClick={props.clickHandler}>{props.projectName}</button>
  );
  
export default ProjectButton;