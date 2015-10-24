var express = require('express');
var bodyParser = require('body-parser');
var routeCtrl = require('./controllers/routeCtrl');
var repl = require('repl');

var serverName = 'Chat App';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get('/',routeCtrl.home);

app.post('/api/createData',routeCtrl.createData);
app.get('/api/readData',routeCtrl.readData);

var port = 3000;

app.server = app.listen(port, function  () {
	console.log(serverName, " running on port: ", port);
});

var io = require('socket.io');
var socketServer = io(app.server);

var dateArray = [];
socketServer.on("connection", function(socket){
	socket.emit('welcome', { hello: "You are connected to " + serverName });
	
	socket.on('response', function(data) {
		dateArray.push(data);
		console.log(dateArray);
	});

});

