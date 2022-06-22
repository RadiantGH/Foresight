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

module.exports = router;
