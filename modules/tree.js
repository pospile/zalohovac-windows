var fs = require('fs'),
    path = require('path');
 
function dirTree(filename, depth) {
    var stats, info;
    try 
    {
        stats = fs.lstatSync(filename);
        info = {
                path: filename,
                name: path.basename(filename)
            };

        if (stats.isDirectory()) {
            if (depth > 5)
            {
                info.type = "folder";
                info.children = "...";
            }
            else
            {
                info.type = "folder";
                info.children = fs.readdirSync(filename).map(function(child) {
                    if (child != "Windows" && child != "PerfLogs")
                    {
                        if (child == "Users") {depth = 0;}
                        return dirTree(filename + '/' + child, depth+1);
                    }
                    else
                    {
                        return "System folder, backup unavailable";
                    }
                });
            }
        } else {
            // Assuming it's a file. In real life it could be a symlink or
            // something else!
            info.type = "file";
            info.size = getFilesizeInBytes(info.path);
        }
    }
    catch(err)
    {
        info = {
                path: "error",
                name: "error-file-locked-or-busy",
                log: err
            };
    }
    
    return info;
}
 
if (module.parent == undefined) {
    // node dirTree.js ~/foo/bar
    var util = require('util');
    console.log(util.inspect(dirTree("C:/",0), false, null));
}

function getFilesizeInBytes(filename) {
    const stats = fs.statSync(filename)
    const fileSizeInBytes = stats.size
    return fileSizeInBytes
}

exports.GetDir = function(path, callback){
    callback(dirTree(path, 0));
};