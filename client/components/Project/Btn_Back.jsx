import React, { Component } from "react";

const Btn_Back = props => (
    <div id='back-button' onClick={props.clickHandler}>
      <img src='https://i.imgur.com/bw95QDh.png' widht='30' height='30'/>
    </div>
  );
  
export default Btn_Back;