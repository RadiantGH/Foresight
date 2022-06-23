const fs = require('fs');

const preferencesManager = {};
preferencesManager.prefPath = 'emptyprefpath';

preferencesManager.projectPath = 'emptyPath';
preferencesManager.darkMode = true;
preferencesManager.fileExtensions = [];
preferencesManager.editOK = [];
preferencesManager.ignore = [];

preferencesManager.getPreferences = function(preferencesPath) {
    this.prefPath = preferencesPath;
    const pref = JSON.parse(fs.readFileSync(preferencesPath));
    this.projectPath = pref.projectPath;
    this.darkMode = pref.darkMode;
    this.fileExtensions = pref.fileExtensions;
    this.editOK = pref.editOK;
    this.ignore = pref.ignore;
};

preferencesManager.savePreferences = function() {
    const newPref = {
        projectPath: this.projectPath,
        darkMode: this.darkMode,
        fileExtensions: this.fileExtensions,
        editOK: this.editOK,
        ignore: this.ignore
    };
    fs.writeFileSync(preferencesPath, JSON.stringify(newPref, null, 2));
};

module.exports = preferencesManager;