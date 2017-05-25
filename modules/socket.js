var socket = require('socket.io-client')('http://localhost:2579');
const notifier = require('node-notifier');
var storage = require('node-persist');
var path = require("path");
storage.initSync();


socket.on('connect', function(){
    console.log("System is connected to main server");
});
socket.on('init', function(data){
    console.log("Reset token obtained: " + data.reset);
    if (storage.getItemSync("reset") == undefined)
    {
        storage.setItemSync('reset',data.reset);
        if (storage.getItemSync("token") == undefined)
        {
            require('getmac').getMac(function(err,mac){
                socket.emit("auth", {"device": mac, "platform": "windows" });
            });
        }
        else
        {
            console.log("Reset id does not exists, but token is present, reset auth manually please");
        }
    }
    else
    {
        console.log("Reset token is already saved (user probably authorized)");
        console.log("Checking token: " + storage.getItemSync('token'));
    }
});
socket.on('auth', function(data){
    console.log(data);
    storage.setItemSync('token',data.token);
    notifier.notify({
        'title': 'Device authorized',
        'message': 'This device was just authorized againts backup server!'
    });
});
socket.on('backup', function(data){
    notifier.notify({
        'title': 'Your device is in backup mode',
        'message': 'This device is now in backup mode, please do not turn off the power!'
    });
    require("./backup.js").Backup(path.resolve("C:\\Users\\vpo\\Desktop\\old\\rrc"));
});
socket.on('path', function(data){
    notifier.notify({
        'title': 'Your device is reacting to request',
        'message': 'This device now send a directory structure to your backup administrator, please be wise and do not turn off this computer.!'
    });
    require("./tree.js").GetDir(data.path, function(structure){
        socket.emit("path", {"structure": structure, "client": socket.id, "request": data.request, "path": data.path});
    });
});
socket.on('disconnect', function(){
    console.log("System disconnected, check internet connetion please!");
    notifier.notify({
        'title': 'Backup server disconnected',
        'message': 'Please check your internet connection!'
    });
});