import React, { Component } from "react";
import Btn_Back from "./Btn_Back.jsx";

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
    <header className='project-header'>
        <h3>{props.curProject + ' =>' + props.curDirectory}</h3>
        <Btn_Back clickHandler={props.backButton}/>
        <button className='to-paths-btn' onClick={props.toPaths}>Convert Keys to Paths</button>
        <button className='to-keys-btn' onClick={props.toKeys}>Convert Paths to Keys</button>
    </header>
    );
}
  
export default ProjectHeader;