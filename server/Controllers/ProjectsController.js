const express = require('express');
const path = require('path');
const fs = require('fs');

const preferencesManager = require('../preferencesManager');
const projectManager = require('../projectManager');

const projectController = {};

projectController.getFolderNames = (req, res, next) => {
    const dir = preferencesManager.projectPath;

    fs.readdir(dir, function(err, files) {
        if(err) return next({message: {err: 'Error getting folder names: ' + err.message}});

        projectManager.setProjects(files);
        
        res.locals.folderNames = files;
        next();
    });
};

projectController.getProjectData = (req, res, next) => {
    const id = req.params.id;
    res.locals.projectData = {};
    const projName = projectManager.tryOpenProject(req.params.id);

    if(!projName) return next({message: {err: 'Cannot open project folder that does not exist at index: ' + id}});

    console.log(projectManager.curRoot);
    fs.readdir(projectManager.curRoot, function(err, files) {
        if(err) {
            console.log(err.message);
            return;
        }

        if(files.includes('.scry')) { //SCRY FOUND
            console.log('Scry found in: ' + projectManager.curRoot);
            res.locals.projectData.scry = projectManager.getScry();
        }
        else { //SCRY NOT FOUND
            console.log('Scry not found in: ' + projectManager.curRoot + '\nCreating now...');
            res.locals.projectData.scry = projectManager.createScry();
        }

        res.locals.projectData.root = projName;
        return next();
    });
};

module.exports = projectController;