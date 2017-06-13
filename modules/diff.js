var storage = require('node-persist');
var WindowsWatcher = require("windows-watcher");
var watcher = new WindowsWatcher();
storage.initSync();


var callback = function(event) {
    console.log(event);
};

exports.Init = function(){
    
    storage.getItem("diff", function(err, data){
        if (data != null && data != undefined){
            console.log("Reopening diff logs");
            console.log(data);
            /*watcher.watch("C:/", callback);*/
        }
        else
        {
            storage.removeItemSync("diff");
            console.log("No diff log present");
        }
    });

};

exports.AddDiffPath = function(path) {
    var data = storage.getItemSync("diff");
    if (data != undefined)
    {    
        data[data.length] = {"path": path, id: data.length};
        storage.setItemSync("diff", data);
        console.log(storage.getItemSync("diff"));
    }
    else
    {
        data = [{"path": path, "id": 0}];
        storage.setItemSync("diff", data);
        console.log(storage.getItemSync("diff"));
    }
    
}

exports.ClearDiffPath = function(){
    storage.removeItemSync("diff");
}