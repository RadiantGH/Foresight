const { dir } = require("console");
const fs = require("fs");
const preferencesManager = require("./preferencesManager");
const express = require("express");
const path = require("path");
const { verify } = require("crypto");

const projectManager = {};

projectManager.curProjects = [];

projectManager.curRoot = "";
projectManager.curScry = {};

projectManager.setProjects = function (files) {
  this.curProjects = [...files];
};

projectManager.tryOpenProject = function (index) {
  if (index >= this.curProjects.length) return false; //Index not found...

  //Initializing starting data
  const projName = this.curProjects[index];
  this.curRoot = preferencesManager.projectPath + projName + "\\";

  console.log("ROOT SET! " + this.curRoot);

  return projName;
};

let newScry;
projectManager.createScry = function () {
  const buildScry = {};
  newScry = [];

  recursiveScry(this.curRoot);

  for (let i = 0; i < newScry.length; i++) {
    const item = newScry[i].replace(this.curRoot, "");
    const newKey = scryKeyMaker();
    buildScry[newKey] = item;
  }

  fs.writeFileSync(this.curRoot + ".scry", JSON.stringify(buildScry, null, 2));
  this.curScry = buildScry;
  return buildScry;
};

projectManager.getScry = function () {
  const scry = JSON.parse(fs.readFileSync(this.curRoot + ".scry"));
  if (verifyScry(scry)) {
    this.curScry = scry;
    return scry;
  } else {
    console.log("REBUILDING SCRY");
    this.curScry = this.createScry();
    return this.curScry;
  }
};

projectManager.getFileTree = function (scry) {
  const paths = Object.values(scry);
  const fileTree = {};

  for (let i = 0; i < paths.length; i++) {
    const fullPath = paths[i];
    const splitPath = fullPath.split("\\");
    const fileName = splitPath.pop();

    let curDirectory = fileTree;
    for(let b = 0; b < splitPath.length; b++) {
        const curFolder = splitPath[b];
        if(curDirectory[curFolder]) curDirectory = curDirectory[curFolder];
        else {
            curDirectory[curFolder] = {};
            curDirectory = curDirectory[curFolder];
        }
    }
  }

  return fileTree;
};

projectManager.modifyScry = function (key, newVal) {
  this.curScry[key] = newVal;

  fs.writeFileSync(this.curRoot + ".scry", JSON.stringify(this.curScry, null, 2));
  return this.curScry;
};

projectManager.renameKey = function(oldKey, newKey) {
  const val = this.curScry[oldKey];
  delete this.curScry[oldKey];
  this.curScry[newKey] = val;

  console.log('deleted ' + oldKey + ' and replaced with ' + newKey + ' for ' + val);
  fs.writeFileSync(this.curRoot + ".scry", JSON.stringify(this.curScry, null, 2));
  return this.curScry;
}

const verifyScry = function (scry) {
  return true;
};

const recursiveScry = function (dir) {
  fs.readdirSync(dir).forEach((file) => {
    const abs = path.join(dir, file);

    if (fs.statSync(abs).isDirectory()) return recursiveScry(abs);
    else if (isScryable(abs)) return newScry.push(abs);
    else return;
  });
};

const isScryable = function (dir) {
  return preferencesManager.fileExtensions.includes(path.extname(dir));
};

const randomInt = () => Math.floor(Math.random() * 10);
const scryKeyMaker = function () {
  return (
    "scry@" +
    randomInt() +
    randomInt() +
    randomInt() +
    randomInt() +
    randomInt() +
    randomInt()
  );
};

module.exports = projectManager;
