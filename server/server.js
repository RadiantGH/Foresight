const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const projectRouter = require("./Routes/projects");
const foresightRouter = require("./Routes/foresight");
const { application } = require("express");

const preferencesManager = require('./preferencesManager');
const projectManager = require('./projectManager');

const preferencesPath = path.resolve(__dirname, '../preferences.json');
preferencesManager.getPreferences(preferencesPath);

app.use(bodyParser.json());
app.use('/dist', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => res.status(200).sendFile(path.join(__dirname, '../client/index.html')));

//Routing
app.use('/projects', projectRouter);
app.use('/foresight', foresightRouter);
app.get('/refresh', (req, res) => res.json(projectManager.createScry()));

//Error handler
app.use((err, req, res, next) => {
    console.log(err);
  const defaultErr = {
    log: "Express error handler caught unknown middleware error",
    status: 500,
    message: { err: "An error occurred" },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(preferencesManager.port);