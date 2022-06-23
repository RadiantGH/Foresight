import React, { Component } from "react";

const ProjectFolder = props => {
    /* Props:
    folderName

    functions:
    openFolder
    dragOver
    drop
    dragEnter
    dragLeave
    */
   console.log('trying to render folder: ' + props.folderName);
   return (
    <div className='project-folder'>
        <button
            id={props.folderName}
            onClick={props.openFolder}
            className='project-folder'
            onDragOver={props.dragOver}
            onDragEnter={(event) => props.dragEnter(event, props.folderName)}
            onDragLeave={props.dragLeave}
        >FOLDER: {props.folderName}</button>
    </div>
  );
}
  
export default ProjectFolder;