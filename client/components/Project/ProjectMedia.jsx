import React, { Component } from "react";

const link = 'http://localhost:3000/foresight/'
const ProjectMedia = props => {
    /* Props:
    foresightKey
    name
    */
   return (
    <div className='project-media'>
        <p>{props.foresightKey}</p>
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