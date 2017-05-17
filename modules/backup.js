var path = require('path');
var cesta = path.resolve(__dirname);

var archiver = require('archiver');
var archive = archiver('zip', {
    store: true // Sets the compression method to STORE. 
});
// append files from a directory 
archive.directory(cesta);
archive.finalize();


exports.Backup = function (path) {

};