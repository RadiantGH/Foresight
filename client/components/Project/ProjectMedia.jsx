import React, { Component } from "react";

const link = 'http://localhost:3000/foresight/'
const ProjectMedia = props => {
    /* Props:
    foresightKey
    name

    functions:
    dragStart
    dragEnd
    renameKey
    */
   return (
    <div className='project-media'
    onDragStart = {(event) => props.dragStart(event, props.foresightKey)}
    onDragEnd={props.dragEnd}
    draggable
    >
        <div className='editable-key'><h3><span
        contentEditable
        spellCheck="false"
        onKeyPress={(eventData) => {
            if(eventData.key === 'Enter') {
                props.renameKey(eventData, props.foresightKey);
                eventData.target.blur();
                eventData.preventDefault();
            }
        }}
        // onInput={(eventData) => props.renameKey(eventData, props.foresightKey)}
        >{props.foresightKey}
        </span></h3></div>
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