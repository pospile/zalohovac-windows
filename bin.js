var path = require('path');
global.appRoot = path.resolve(__dirname);

require('getmac').getMac(function(err,mac){
    if (err)  throw err
    console.log("Running Zalohovac for device: " + mac);
    console.log("Device registered");
    require("./modules/socket.js");
})
