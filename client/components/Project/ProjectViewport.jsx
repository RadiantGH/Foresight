import React, { Component } from "react";
import ProjectHeader from './ProjectHeader.jsx';
import ProjectMedia from './ProjectMedia.jsx';
import ProjectFolder from './ProjectFolder.jsx';

class ProjectViewport extends Component {
    constructor(props) {
      // call super
      super(props);
      /* Props:
      scry
      fileTree
      curDirectory
      curProject
      
      functions:
      backButton
      openFolder

      dragStart
      dragOver
      drop
      dragEnter
      */
    }

    render() {
      const scry = this.props.scry;
      const paths = Object.keys(scry);
      const curDirectory = this.props.curDirectory;

      const showFolders = [];
      const showFiles = [];

      const splitDirectory = curDirectory.split('\\');
      let dirObj = this.props.fileTree;
      //Getting which folders to put in file
      for(let i = 0; i < splitDirectory.length; i++) {
          const folder = splitDirectory[i];

          if(folder === '' || folder === undefined) continue;

          if(dirObj[folder]) {
              dirObj = dirObj[folder];
          }
          else {
              console.log('INVALID DIRECTORY FOUND AT: ' + this.props.curDirectory);
          }
      }
      
      const dirObjNames = Object.keys(dirObj);
      for(let i = 0; i < dirObjNames.length; i++) {
          showFolders.push(
            <ProjectFolder
            folderName={dirObjNames[i]}
            openFolder={this.props.openFolder}
            dragOver={this.props.dragOver}
            drop={this.props.drop}
            dragEnter={this.props.dragEnter}
            dragEnd={this.props.dragEnd}
            dragLeave={this.props.dragLeave}
            />
          );
      }

      //Getting which files to put in folder
      for(let i = 0; i < paths.length; i++) {
          const key = paths[i];
          const fullPath = scry[key];
          const splitPath = fullPath.split('\\');
          const fileName = splitPath.pop();
          let joinedPath = splitPath.join('\\');
          
          if(curDirectory !== '') joinedPath += '\\'; //Adding the extra slash when checking folders outside of root

          // console.log('Comparing: ' + curDirectory + ' vs ' + joinedPath);
          if(curDirectory === joinedPath) {
              showFiles.push(
                  <ProjectMedia foresightKey={key} name={fileName} dragStart={this.props.dragStart} dragEnd={this.props.dragEnd}/>
              );
          }
          else {
              // showFiles.push(
              //     <p>NOT SHOWN: {joinedPath + fileName}</p>
              // );
          }
      }

      return (
      <div className='project-viewport'>
          <ProjectHeader
          curDirectory={this.props.curDirectory}
          curProject={this.props.curProject}
          backButton={this.props.backButton}
          />

          <div id='folder-container'>
              {showFolders}
          </div>
          <div id='file-container'>
              {showFiles}
          </div>
      </div>
      );
    }
}

export default ProjectViewport;