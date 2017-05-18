var dirToJson = require('dir-to-json');
const util = require('util');
var jsonfile = require('jsonfile');


if (module.parent == undefined) {
    dirToJson( "C:\\" )
        .then( function( dirTree ){
            //console.log( util.inspect(dirTree, false, null)  );
            jsonfile.writeFileSync("./tree.json", dirTree);
            //console.log(jsonfile.readFileSync("./tree.json"));
        })
        .catch( function( err ){
            throw err;
        });
}