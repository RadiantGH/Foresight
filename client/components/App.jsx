import React, { Component } from "react";
import ProjectPreview from "./ProjectPreview.jsx";

class App extends Component {
  constructor() {
    // call super
    super();

    this.state = { projects: [], curProject: '', curDirectory: '', scry: {}};

    this.openProject = this.openProject.bind(this);
  }

  componentDidMount() {
    fetch("http://localhost:3000/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: [...data] });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }


  render() {
    //LOOKING FOR PROJECT!!!
    if(this.state.curProject === '' && this.state.projects.length > 0) {
        const projectItems = [];
        for (let i = 0; i < this.state.projects.length; i++) {
        projectItems.push(
            <ProjectPreview
            clickHandler={this.openProject}
            projectName={this.state.projects[i]}
            index={i}
            />
        );
        }

        return (
        <div className="App">
            <header className="App-header">
            <p>TEST</p>
            {projectItems}
            </header>
        </div>
        );
    }
    else if(this.state.curProject !== '') { //Currently browsing project!!
        const scry = this.state.scry;
        const paths = Object.keys(scry);
        const showFiles = [];
        const curDirectory = this.state.curDirectory;

        for(let i = 0; i < paths.length; i++) {
            const key = paths[i];
            const fullPath = scry[key];
            const splitPath = fullPath.split('\\');
            const fileName = splitPath.pop();
            const joinedPath = splitPath.join('\\');

            console.log(curDirectory + ' vs ' + joinedPath);
            if(curDirectory === joinedPath) {
                showFiles.push(
                    <p>{key}: {fileName}</p>
                );
            }
            else {
                showFiles.push(
                    <p>NOT SHOWN: {joinedPath + fileName}</p>
                );
            }
            
        }

        return (
        <div className="App">
            <p>{this.state.curProject + ' =>' + this.state.curDirectory}</p>
            <div id='file-container'>
                {showFiles}
            </div>
        </div>
        );
    }
    else { //Please wait
        return (
        <div className="App">
            <p>PLEASE WAIT!</p>
        </div>
        );
    }
  }

  openProject(eventData) {
    fetch('http://localhost:3000/projects/' + eventData.target.id)
      .then((response) => response.json())
      .then((data) => {
        const newState = {};
        newState.curProject = data.root;
        newState.curDirectory = '';
        newState.scry = data.scry;

        console.log('NEW SCRY SET: ' + newState.scry);
        this.setState(newState);
      })
      .catch((error) => {
        console.log('Recieved errror: ' + error);
      });
  }

  refreshScry() {
    fetch('http://localhost:3000/refresh/')
      .then((response) => response.json())
      .then((data) => {
        const newState = {scry: data};

        console.log('NEW SCRY SET: ' + newState);
        this.setState(newState);
      })
      .catch((error) => {
        console.log('Recieved errror: ' + error);
      });
  }

  backButton(eventData) {

  }

  changeDirectory(eventData) {

  }
}

export default App;

  /* POST EXAMPLE WITH HEADER
  fetch('http://localhost:3000/project', {
      method: 'POST',
      headers: {
        'Content-Type': "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  */
