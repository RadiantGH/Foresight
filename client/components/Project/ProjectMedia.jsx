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
        <div className='editable-key'><h3 className='edit-text'><span
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
        
        <div className='img-container'>
            <img
                className='media-img'
                src={props.getLink(undefined, props.foresightKey)}
                alt={props.name}
                width='300'
                height='600'
            />
        </div>
        <div className='button-holder'>
            <button className='copy-link' onClick={(event) => props.getLink(event, props.foresightKey)}>
                <img src='https://i.imgur.com/lDqN9yU.png' width='20' height='20'/>
            </button>
            <button className='move-up' onClick={(event) => props.moveUp(event, props.name, props.foresightKey)}>
                <img src='https://i.imgur.com/yYoGWmN.png' width='20' height='20'/>
            </button>
        </div>
    </div>
  );
}
  
export default ProjectMedia;