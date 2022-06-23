const express = require('express');
const router = express.Router();
const fs = require('fs');

const projectController = require('../Controllers/ProjectsController');
const preferencesManager = require('../preferencesManager');
const projectManager = require('../projectManager');


router.get('/', projectController.getFolderNames, (req, res) => {
    res.status(200);
    res.json(res.locals.folderNames);
});

router.get('/:id', projectController.getProjectData, (req, res, next) => {
    res.status(200);
    res.json(res.locals.projectData);
});

router.post('/move', projectController.moveFile, (req, res, next) => {
    res.status(200);
    res.json(res.locals.newScry);
});

router.post('/rename', projectController.renameKey, (req, res, next) => {
    res.status(200);
    res.json(res.locals.newScry);
});

router.post('/toPaths', projectController.setToPaths, (req, res, next) => {
    res.status(200);
    res.send('Successfuly changed scripts to paths!');
});

router.post('/toKeys', projectController.setToKeys, (req, res, next) => {
    res.status(200);
    res.send('Successfuly changed scripts to keys!');
});



module.exports = router;
