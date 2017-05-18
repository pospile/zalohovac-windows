var fs = require('fs');
var pathS = require('path');
var archiver = require('archiver');
var moment = require("moment");

exports.Backup = function (path) {

    var cesta = pathS.resolve(path);

    var output = fs.createWriteStream(pathS.resolve(appRoot + "/backup/"+moment(moment(), "MM-DD-YYYY-HH-mm-ss")+".zip"));

    var archive = archiver('zip', {
        store: true // Sets the compression method to STORE. 
    });
    archive.pipe(output);
    // append files from a directory 
    archive.directory(cesta);
    archive.finalize();

};