import React, { Component } from "react";

const ProjectMedia = props => {
    /* Props:
    foresightKey
    name

    functions:
    getLink
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
        <button className='copy-link' onClick={(event) => props.getLink(event, props.foresightKey)}>Copy Link</button>
        <button className='move-up' onClick={(event) => props.moveUp(event, props.name, props.foresightKey)}>Move Up</button>
        <img
            className='media-img'
            src={props.getLink(udefined, props.foresightKey)}
            alt={props.name}
            width='300'
            height='600'
        /> 
    </div>
  );
}
  
export default ProjectMedia;