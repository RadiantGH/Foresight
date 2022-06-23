import ProjectButton from "./ProjectButton.jsx";

import React from "react";

const ProjectFinder = (props) => {
  /* Props:
    projects

    functions:
    openProject
    */
  const projectItems = [];
  const projects = props.projects;

  for (let i = 0; i < projects.length; i++) {
    projectItems.push(
      <ProjectButton
        clickHandler={props.openProject}
        projectName={projects[i]}
        index={i}
      />
    );
  }

  return <div className='project-finder'>{projectItems}</div>;
};

export default ProjectFinder;
