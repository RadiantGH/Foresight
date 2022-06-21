import React, { Component } from 'react';
import OpenProjectBtn from './OpenProjectBtn.jsx';

class App extends Component {
    constructor() {
      // call super
      super();
  
      this.state = {
        text: 'hello gamers'
      };
  
      this.testFunction = this.testFunction.bind(this);
    }
  
    render() {
      return (
      <div className='App'>
        <header className='App-header'>
          <p>{this.state.text}</p>
          <OpenProjectBtn clickHandler={this.testFunction}/>
        </header>
      </div>
      )
    }
  
    testFunction() {
      console.log('I PRESED IT THOUGH');
      this.setState({text: 'I CHANGED THE TEXT?!'});
    }
  }
  
  export default App;