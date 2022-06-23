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
    console.log('trying to get projects');
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

        res.locals.projectData.fileTree = projectManager.getFileTree(res.locals.projectData.scry);

        res.locals.projectData.root = projName;
        return next();
    });
};

projectController.moveFile = (req, res, next) => {
    const body = req.body;

    const curDirectory = projectManager.curRoot;
    const oldFilepath = curDirectory + body.old;
    const newFilepath = curDirectory + body.new;

    fs.rename(oldFilepath, newFilepath, function (err) {
        if (err)  return next({message: {err: 'Failed to move file to: ' + newFilepath}});
        
        res.locals.newScry = projectManager.modifyScry(body.key, body.new);
        return next();
    })
};

projectController.renameKey = (req, res, next) => {
    res.locals.newScry = projectManager.renameKey(req.body.oldKey, req.body.newKey);
    return next();
}

projectController.setToPaths = (req, res, next) => {
    projectManager.scripts = [];
    projectManager.getScripts();
    const scripts = [...projectManager.scripts];

    // console.log(scripts);
    // return;

    const curScry = projectManager.curScry;
    const keys = Object.keys(curScry);
    for(let i = 0; i < scripts.length; i++) {
        let content = fs.readFileSync(scripts[i]);
        let newContent = content;
        // console.log('Checking: ' + scripts[i]);

        for(let b = 0; b < keys.length; b++) {
            const k = keys[b];
            const dir = curScry[k];
            
            newContent = newContent.toString().replace(getKeyLink(k), dir.replace('\\', '\\\\'));
        }
        
        fs.writeFileSync(scripts[i], newContent);
        content = fs.readFileSync(scripts[i]);
    }
    next();
}

projectController.setToKeys = (req, res, next) => {
    projectManager.scripts = [];
    projectManager.getScripts();
    const scripts = [...projectManager.scripts];

    // console.log(scripts);
    // return;

    const curScry = projectManager.curScry;
    const keys = Object.keys(curScry);
    for(let i = 0; i < scripts.length; i++) {
        let content = fs.readFileSync(scripts[i]);
        let newContent = content;
        // console.log('Checking: ' + scripts[i]);

        for(let b = 0; b < keys.length; b++) {
            const k = keys[b];
            const dir = curScry[k];
            newContent = newContent.toString().replace(dir.replace('\\', '\\\\'), getKeyLink(k));
        }

        fs.writeFileSync(scripts[i], newContent);
        content = fs.readFileSync(scripts[i]);
    }
    next();
}

const getKeyLink = function(key) {
    return 'http://localhost:' + preferencesManager.port + '/foresight/' + key;
}

module.exports = projectController;