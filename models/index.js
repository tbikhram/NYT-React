//the index.js will work when the 
//folder is required, express will look for 
// a file called index.js inside the required folder to
// get Article.js and Note.js

exports.Article = require("./Article.js");
exports.Note = require("./Note.js");