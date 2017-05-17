require('getmac').getMac(function(err,mac){
    if (err)  throw err
    console.log("Running Zalohovac for device: " + mac);
    console.log("Device registered");
    require("./modules/socket.js");
})
