import React, { Component } from "react";
import ProjectPreview from "./ProjectPreview.jsx";

class App extends Component {
  constructor() {
    // call super
    super();

    this.state = { projects: [], curProject: '', curDirectory: '', scry: {}, fileTree: {}};

    this.openProject = this.openProject.bind(this);
    this.openFolder = this.openFolder.bind(this);
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
        const curDirectory = this.state.curDirectory;

        const showFolders = [];
        const showFiles = [];

        const splitDirectory = curDirectory.split('\\');
        let dirObj = this.state.fileTree;
        //Getting which folders to put in file
        for(let i = 0; i < splitDirectory.length; i++) {
            const folder = splitDirectory[i];

            if(folder === '' || folder === undefined) continue;

            if(dirObj[folder]) {
                dirObj = dirObj[folder];
            }
            else {
                console.log('INVALID DIRECTORY FOUND AT: ' + this.state.curDirectory);
            }
        }
        
        const dirObjNames = Object.keys(dirObj);
        for(let i = 0; i < dirObjNames.length; i++) {
            showFolders.push(
                <button id={dirObjNames[i]} onClick={this.openFolder}>FOLDER: {dirObjNames[i]}</button>
            );
        }

        //Getting which files to put in folder
        for(let i = 0; i < paths.length; i++) {
            const key = paths[i];
            const fullPath = scry[key];
            const splitPath = fullPath.split('\\');
            const fileName = splitPath.pop();
            const joinedPath = splitPath.join('\\');
            
            if(curDirectory !== '') joinedPath += '\\'; //Adding the extra slash when checking folders outside of root

            console.log('Comparing: ' + curDirectory + ' vs ' + joinedPath);
            if(curDirectory === joinedPath) {
                showFiles.push(
                    <p>{key}: {fileName}</p>
                );
            }
            else {
                // showFiles.push(
                //     <p>NOT SHOWN: {joinedPath + fileName}</p>
                // );
            }
        }

        return (
        <div className="App">
            <p>{this.state.curProject + ' =>' + this.state.curDirectory}</p>
            <div id='folder-container'>
                {showFolders}
            </div>
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
        newState.fileTree = data.fileTree;

        console.log('File Tree: ' + '\nroot: ' + data.root + '(implied): ', newState.fileTree);

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

  openFolder(eventData) {
    const folderName = eventData.target.id;
    const curDirectory = this.state.curDirectory;
    const newDirectory = curDirectory + folderName + '\\';

    console.log('Changing directory from: ' + curDirectory + ' to ' + newDirectory);

    this.setState({curDirectory: newDirectory});
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
