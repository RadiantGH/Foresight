import React, { Component } from "react";
import Btn_Back from "./Btn_Back.jsx";

const ProjectHeader = props => {
    /* Props:
    curDirectory
    curProject

    functions:
    backButton
    */
   return (
    <header className='project-header'>
        <h3>{props.curProject + ' =>' + props.curDirectory}</h3>
        <Btn_Back clickHandler={props.backButton}/>
    </header>
    );
}
  
export default ProjectHeader;