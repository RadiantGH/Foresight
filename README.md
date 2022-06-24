![alt text](https://i.imgur.com/H7m8opH.png)  
A media management app for developers.  

CURRENTLY A DANGEROUS PROGRAM TO USE. WAIT UNTIL ELECTRON PORT (If it ever comes).

## Description

Wanted to create a pseudo desktop-app using ReactJS. Foresight is a tool meant to make media/asset management for your projects easier. Files are given unique, editable, keys that can be used to access said file no matter what directory it's in. Before you build your file, you may choose to change all of your unique paths into automatically resolved filepaths to their correct directory. This allows you to organize and move files around your project freely without having to worry about updating your media directories until the very end.

## To Do
* Clean electron port
* Add/delete folders
* Delete files
* Autocorrect incorrect '.scry' directories when opening project

## Basics
Preferences.json in the root folder should have most of what you need to know. There's a Project folder that it checks content for and everything is based on that. There's an array of files it allows and files/folders it ignores. Probably look into ProjectManager.js to see how the scry database works.

These are all temporary features. After Codesmith the plan is to port it to a proper desktop app framework like Electron so it can function like a proper application without all the spooky scary network stuff.

## Issues
* NEED MORE SLASHES WHEN CONVERTING FROM KEYS TO PATHS
* Clicking folder icon img instead of the button itself causes issues
* Change scripts when changing foresight key
* Change scripts when changing foresight directory (If directory is used)

## Dependencies

* React
* Express
* Webpack

## Author

Ian (G)
<!-- [@DomPizzie](https://twitter.com/dompizzie) -->

## License
Do whatever you want.


## Icon
Credit to: https://adioma.com/
