
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var socketio = require('socket.io')
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//index route
app.get('/', routes.index);
 
//Create the server
var server = http.createServer(app)

//Start the web socket server
var io = socketio.listen(server);

var users = {}

//If the client just connected
io.sockets.on('connection', function(socket) {

});

server.listen(3000, function(){
  console.log('Express server listening on port ' + app.get('port'));
});


