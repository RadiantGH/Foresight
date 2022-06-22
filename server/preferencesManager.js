const fs = require('fs');

const preferencesManager = {};

preferencesManager.projectPath = 'emptyPath';
preferencesManager.darkMode = true;
preferencesManager.prefPath = 'emptyprefpath';
preferencesManager.fileExtensions = [];

preferencesManager.getPreferences = function(preferencesPath) {
    this.prefPath = preferencesPath;
    const pref = JSON.parse(fs.readFileSync(preferencesPath));
    this.projectPath = pref.projectPath;
    this.darkMode = pref.darkMode;
    this.fileExtensions = pref.fileExtensions;
};

preferencesManager.savePreferences = function() {
    const newPref = {projectPath: this.projectPath, darkMode: this.darkMode};
    fs.writeFileSync(preferencesPath, JSON.stringify(newPref, null, 2));
};

module.exports = preferencesManager;