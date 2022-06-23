import React, { Component } from "react";

const link = 'http://localhost:3000/foresight/'
const ProjectMedia = props => {
    /* Props:
    foresightKey
    name

    functions:
    dragStart
    dragEnd
    */
   return (
    <div className='project-media'
    onDragStart = {(event) => props.dragStart(event, props.foresightKey)}
    onDragEnd={props.dragEnd}
    draggable
    >
        <p>{props.foresightKey + ' & ' + props.name}</p>
        <button onClick={(event) => props.moveUp(event, props.name, props.foresightKey)}>Move Up</button>
        <img
            className='media-img'
            src={link+props.foresightKey}
            alt={props.name}
            width='300'
            height='600'
        /> 
    </div>
  );
}
  
export default ProjectMedia;