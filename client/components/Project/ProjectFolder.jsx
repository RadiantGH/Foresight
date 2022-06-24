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
   return (
        <button className='project-folder'
            id={props.folderName}
            onClick={props.openFolder}
            onDragOver={props.dragOver}
            onDragEnter={(event) => props.dragEnter(event, props.folderName)}
            onDragLeave={props.dragLeave}
        >
            <img src='https://i.imgur.com/25L7OqK.png' width='30' height='30'/> {props.folderName}
        </button>
  );
}
  
export default ProjectFolder;