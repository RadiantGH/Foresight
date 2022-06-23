import React, { Component } from "react";
import ProjectViewport from "./Project/ProjectViewport.jsx";
import ProjectFinder from "./ProjectFinder.jsx";
import AppHeader from "./AppHeader.jsx";

class App extends Component {
  constructor() {
    // call super
    super();

    this.state = {
      projects: [],
      curProject: "",
      curDirectory: "",
      scry: {},
      fileTree: {}
    };

    this.storage = {};

    this.openProject = this.openProject.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.backButton = this.backButton.bind(this);

    this.moveFileUp = this.moveFileUp.bind(this);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
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
    let subRender;

    if (this.state.curProject === "" && this.state.projects.length > 0) {
      //LOOKING FOR PROJECT!!!
      subRender = (
        <ProjectFinder
          projects={this.state.projects}
          openProject={this.openProject}
        />
      );
    } else if (this.state.curProject !== "") {
      //Currently browsing project!!
      subRender = (
        <ProjectViewport
          scry={this.state.scry}
          fileTree={this.state.fileTree}
          curDirectory={this.state.curDirectory}
          curProject={this.state.curProject}
          backButton={this.backButton}
          openFolder={this.openFolder}

          dragStart={this.onDragStart}
          dragOver={this.onDragOver}
          dragEnter={this.onDragEnter}
          drop={this.onDragOver}
          dragEnd={this.onDragEnd}
          dragLeave={this.onDragLeave}
        />
      );
    } else {
      //Please wait
      subRender = <h1>Please wait...</h1>;
    }

    return (
      <div className="App">
        <AppHeader />
        {subRender}
      </div>
    );
  }

  openProject(eventData) {
    fetch("http://localhost:3000/projects/" + eventData.target.id)
      .then((response) => response.json())
      .then((data) => {
        const newState = {};
        newState.curProject = data.root;
        newState.curDirectory = "";
        newState.scry = data.scry;
        newState.fileTree = data.fileTree;

        // console.log('File Tree: ' + '\nroot: ' + data.root + '(implied): ', newState.fileTree);

        // console.log('NEW SCRY SET: ', newState.scry);
        this.setState(newState);
      })
      .catch((error) => {
        console.log("Recieved errror: " + error);
      });
  }

  refreshScry() {
    fetch("http://localhost:3000/refresh/")
      .then((response) => response.json())
      .then((data) => {
        const newState = { scry: data };

        // console.log('NEW SCRY SET: ', newState);
        this.setState(newState);
      })
      .catch((error) => {
        console.log("Recieved errror: " + error);
      });
  }

  openFolder(eventData) {
    const folderName = eventData.target.id;
    const curDirectory = this.state.curDirectory;
    const newDirectory = curDirectory + folderName + "\\";

    console.log(
      "Changing directory from: " + curDirectory + " to " + newDirectory
    );

    this.setState({ curDirectory: newDirectory });
  }

  backButton(eventData) {
    const curDirectory = this.state.curDirectory;

    if (curDirectory === "") {
      //Go back to project select!
      fetch("http://localhost:3000/projects")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ curProject: "", projects: [...data] });
        })
        .catch((error) => {
          console.error("Error retrieving projects after going back:", error);
          this.setState({ curProject: "" });
        });
    } else {
      //Go back a directory
      const splitDirectory = curDirectory.split("\\");

      //POP TWICE because there's an empty string at the very end!
      //Also it mutates
      splitDirectory.pop();
      splitDirectory.pop();

      let newDirectory = ""; //Default if the final directory is empty
      for (let i = 0; i < splitDirectory.length; i++) {
        newDirectory += splitDirectory[i] + "\\";
      }

      this.setState({ curDirectory: newDirectory });
    }
  }

  moveFileUp(eventData) {
    //Moves a file up one folder
  }

  // Drag
  onDragStart = (event, foresightKey) => {
    this.storage.curDrag = foresightKey;
    this.storage.curFolder = '';
    console.log("dragstart on div: ", foresightKey);
  };

  onDragEnter = (event, folderName) => {
    this.storage.curFolder = folderName;
    console.log('Set folder name as ' + this.storage.curFolder + '\nInput: ' + folderName);
    event.preventDefault();
  }

  onDragOver = (event, folderName) => {
    event.preventDefault();
  };

  onDragLeave = (event) => {
    console.log('EMPTYING FOLDER');
    this.storage.curFolder = '';
    event.preventDefault();
  }

  onDrop = (event, folderName) => {
    const data = event.dataTransfer.getData("text/plain");
    console.log('Dropped on ' + data);
    event.preventDefault();
  }

  onDragEnd = (event) => {
    if(this.storage.curFolder === '') {
        console.log('Empty drop.');

        this.storage.curDrag = '';
    }
    else {
        console.log('dropped ' + this.storage.curDrag + ' on ' + this.storage.curFolder);

        const key = this.storage.curDrag;
        const folder = this.storage.curFolder;

        this.storage.curDrag = '';
        this.storage.curFolder = '';
    }
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
