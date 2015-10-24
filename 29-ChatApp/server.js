
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('/html/chat.html', {root: './public'});
});
app.server = app.listen(3000);

var io = require("socket.io");
var socketServer = io(app.server);