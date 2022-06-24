import React, { Component } from "react";

const ProjectHeader = props => {
    /* Props:
    curDirectory
    curProject

    functions:
    backButton
    toPaths
    toKeys
    */
   return (
    <>
        <p className='nav-text'>{props.curProject + ' =>' + props.curDirectory}</p>
        <header className='project-header'>
            <button className='to-paths-btn' onClick={props.toPaths}>Convert Keys to Paths</button>
            <button className='to-keys-btn' onClick={props.toKeys}>Convert Paths to Keys</button>
        </header>
    </>
    );
}
  
export default ProjectHeader;