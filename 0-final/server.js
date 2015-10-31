var express = require('express');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/velociti');
var User = require('./models/userModel');
var app = express();
app.use(express.static(__dirname + '/public'));
module.exports = app;
require("./config/myPassport");


var port = 80;
app.server = app.listen(port, function() {
    console.log('Velociti Started', Date.now());
});

var io = require("socket.io");
var socketServer = io(app.server);
var loggedInUsers = {};

socketServer.use(function(socket, next) {
    app.sessionMiddleware(socket.request, {}, next);
});
function isEven(n) {return n % 2 === 0; }
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00



socketServer.on("connection", function(socket) {
    console.log("NEW SOCKET CONNECTION Adress: ", socket.handshake.address);

    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {
        var userId = socket.request.session.passport.user;
        console.log("UserId Logged In",userId);

        User.findById(userId, function(error, userDoc) {
            userDoc.password = null;
            loggedInUsers[userId] = userDoc;

            // console.log(loggedInUsers);

            socketServer.emit('allUsers',loggedInUsers);
        });//// User.findById(userId

        socket.on("myLocation", function(userLocation) {
            // console.log(userLocation);
            loggedInUsers[userId].lat = userLocation.lat;
            loggedInUsers[userId].lon = userLocation.lon;
            loggedInUsers[userId].timeStamp = userLocation.timeStamp;
            console.log(userLocation.timeStamp);
            console.log(loggedInUsers);
            socketServer.emit('allUsers',loggedInUsers);
            // socketServer.emit('allUsers',loggedInUsers);
        });////socket.on("myLocation",

        socket.on('disconnect', function() {
            console.log('user disconnected');
            delete  loggedInUsers[userId] ;
            socketServer.emit('loggedInUsers', loggedInUsers);
        }); //////socket.on('disconnect'


    }////if (socket.request.session &&
}); ////socketServer.on("connection",



// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00