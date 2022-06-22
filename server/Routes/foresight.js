const express = require('express');
const router = express.Router();
const fs = require('fs');

const preferencesManager = require('../preferencesManager');
const projectManager = require('../projectManager');

router.get('/:id', (req, res, next) => {
    const id = req.params.id;

    if(!projectManager.curScry[id]) {
        return next({status: 404, message: {err: 'Cannot find filepath for requested key: ' + id}});
    }
    const path = projectManager.curScry[id];
    const impliedFullDirectory = projectManager.curRoot + path;
    res.status(200);

    res.sendFile(impliedFullDirectory);
    // res.send('ID: ' + id + '\nPATH: ' + path + '\nImplied Full Directory: ' + impliedFullDirectory);
    // res.json(res.locals.projectData);
});

module.exports = router;