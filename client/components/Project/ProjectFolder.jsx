import React, { Component } from "react";

const ProjectFolder = props => {
    /* Props:
    folderName

    functions:
    openFolder
    */
   console.log('trying to render folder: ' + props.folderName);
   return (
    <div className='project-folder'>
        <button id={props.folderName} onClick={props.openFolder}>FOLDER: {props.folderName}</button>
    </div>
  );
}
  
export default ProjectFolder;