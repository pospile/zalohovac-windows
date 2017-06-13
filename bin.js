var path = require('path');
global.appRoot = path.resolve(__dirname);

require('getmac').getMac(function(err,mac){
    if (err)  throw err

    var storage = require('node-persist');
    storage.initSync();
    if (storage.getItemSync("mac") != undefined || storage.getItemSync("mac") != null)
    {
        storage.setItemSync("mac", mac);
        global.deviceMac = storage.getItemSync("mac");
    }

    console.log("Running Zalohovac for device: " + mac);
    console.log("Device registered");
    console.log("Reopening all device backups and diffs");
    require("./modules/diff.js").ClearDiffPath();
    require("./modules/diff.js").Init();
    //require("./modules/diff.js").AddDiffPath("C:/Users/vpo/Desktop/backup");
    require("./modules/socket.js");
});
