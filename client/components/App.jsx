import React, { Component } from "react";
import ProjectViewport from "./Project/ProjectViewport.jsx";
import ProjectFinder from "./ProjectFinder.jsx";
import AppHeader from "./AppHeader.jsx";

const port = 5151;
class App extends Component {
  constructor() {
    // call super
    super();

    this.state = {
      projects: [],
      curProject: "",
      curDirectory: "",
      scry: {},
      fileTree: {},
    };

    this.storage = {};

    this.getLink = this.getLink.bind(this);
    this.setToPaths = this.setToPaths.bind(this);
    this.setToKeys = this.setToKeys.bind(this);

    this.openProject = this.openProject.bind(this);
    this.openFolder = this.openFolder.bind(this);
    this.backButton = this.backButton.bind(this);

    this.moveFileUp = this.moveFileUp.bind(this);
    this.renameKeyConfirm = this.renameKeyConfirm.bind(this);

    this.onDragStart = this.onDragStart.bind(this);
    this.onDragOver = this.onDragOver.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
  }

  componentDidMount() {
    fetch(`http://localhost:${port}/projects`)
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
          getLink={this.getLink}
          toPaths={this.setToPaths}
          toKeys={this.setToKeys}
          backButton={this.backButton}
          openFolder={this.openFolder}
          dragStart={this.onDragStart}
          dragOver={this.onDragOver}
          dragEnter={this.onDragEnter}
          drop={this.onDragOver}
          dragEnd={this.onDragEnd}
          dragLeave={this.onDragLeave}
          moveUp={this.moveFileUp}
          renameKey={this.renameKeyConfirm}
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
    fetch(`http://localhost:${port}/projects/${eventData.target.id}`)
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
    fetch(`http://localhost:${port}/refresh`)
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

  getLink(eventData, k) {
    const link = `http://localhost:${port}/foresight/${k}`;
    eventData.target.textContent = "Copied Link!";
    navigator.clipboard.writeText(link);
  }

  setToPaths(eventData) {
    fetch(`http://localhost:${port}/projects/toPaths`, {
        method: "POST"
      })
      .then((response) => response.toString())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('Error trying to set to paths...', error);
      });
  }

  setToKeys(eventData) {
    fetch(`http://localhost:${port}/projects/toKeys`, {
        method: "POST"
      })
      .then((response) => response.toString())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('Error trying to set to keys...', error);
      });
  }

  openFolder(eventData) {
    const folderName = eventData.target.id;
    const curDirectory = this.state.curDirectory;
    const newDirectory = curDirectory + folderName + "\\";
    this.setState({ curDirectory: newDirectory });
  }

  backButton(eventData) {
    const curDirectory = this.state.curDirectory;

    if (curDirectory === "") {
      //Go back to project select!
      fetch(`http://localhost:${port}/projects`)
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

  moveFileUp(eventData, fileName, key) {
    if (this.state.curDirectory === "") {
      console.log("Cannot move a file up from the root!");
    } else {
      const curDirectory = this.state.curDirectory;

      const fullPath = this.state.scry[key];
      const splitPath = fullPath.split("\\");
      let fileName = splitPath.pop();
      splitPath.pop(); //Pop again to move up a folder
      let pathBase = splitPath.join("\\");

      console.log("SPLIT PATH: ", splitPath);

      if (splitPath.length > 0) pathBase += "\\"; //Adding the extra slash when checking folders outside of root

      const oldPath = fullPath;

      const splitFilename = fileName.split(".");
      fileName = splitFilename[0];
      let extension = "." + splitFilename[1];
      let newPath = pathBase + fileName + extension;

      const vals = Object.values(this.state.scry);
      let i = 0;
      while (vals.includes(newPath)) {
        i++;
        console.log("Duplicate path detected!");
        newPath = pathBase + `${fileName}-${i}${extension}`;
      }

      const sendData = { key: key, old: oldPath, new: newPath };

      console.log(oldPath + " will become " + newPath);

      fetch(`http://localhost:${port}/projects/move/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ scry: data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }

  renameKeyConfirm(eventData, oldKey) {
    const newKey = eventData.target.textContent;
    if (Object.keys(this.state.scry).includes(newKey)) {
      eventData.target.textContent = oldKey;
      console.log(
        "Cannot set key to " +
          newKey +
          " because that key already exists in our scry database!"
      );
      return;
    }

    console.log(oldKey + " will become " + newKey);
    const sendData = { oldKey: oldKey, newKey: newKey };

    fetch(`http://localhost:${port}/projects/rename/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sendData),
    })
      .then((response) => response.json())
      .then((data) => {
        this.setState({ scry: data });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // Drag
  onDragStart = (event, foresightKey) => {
    this.storage.curDrag = foresightKey;
    this.storage.curFolder = "";
  };

  onDragEnter = (event, folderName) => {
    this.storage.curFolder = folderName;
    event.preventDefault();
  };

  onDragOver = (event, folderName) => {
    event.preventDefault();
  };

  onDragLeave = (event) => {
    this.storage.curFolder = "";
    event.preventDefault();
  };

  onDrop = (event, folderName) => {
    event.preventDefault();
  };

  onDragEnd = (event) => {
    if (this.storage.curFolder === "") {
      this.storage.curDrag = "";
    } else {
      const key = this.storage.curDrag;
      const folder = this.storage.curFolder;
      const curDirectory = this.state.curDirectory;

      this.storage.curDrag = "";
      this.storage.curFolder = "";

      const fullPath = this.state.scry[key];
      const splitPath = fullPath.split("\\");
      let fileName = splitPath.pop();
      let joinedPath = splitPath.join("\\");

      if (curDirectory !== "") joinedPath += "\\"; //Adding the extra slash when checking folders outside of root

      const oldPath = fullPath;
      const pathBase = joinedPath + folder + "\\";
      const splitFilename = fileName.split(".");
      fileName = splitFilename[0];
      let extension = "." + splitFilename[1];
      let newPath = pathBase + fileName + extension;

      const vals = Object.values(this.state.scry);
      let i = 0;
      while (vals.includes(newPath)) {
        i++;
        console.log("Duplicate path detected!");
        newPath = pathBase + `${fileName}-${i}${extension}`;
      }

      const sendData = { key: key, old: oldPath, new: newPath };

      console.log(oldPath + " will become " + newPath);

      fetch(`http://localhost:${port}/projects/move/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendData),
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({ scry: data });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };
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
