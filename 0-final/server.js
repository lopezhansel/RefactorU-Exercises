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

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

var port = 80;
app.server = app.listen(port, function() {
    console.log('Velociti Started', Date.now());
});
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

var io = require("socket.io");
var socketServer = io(app.server);
var loggedInUsers = {};

socketServer.use(function(socket, next) {
    app.sessionMiddleware(socket.request, {}, next);
});

function isEven(n) {return n % 2 === 0; }


socketServer.on("connection", function(socket) {

    User.find({}).limit(100).exec(function(err, users) {
        socketServer.emit('loggedInUsers', users);
        setInterval(function() {
            users.forEach(function(user) {

                var num = 0.00001066; // var num = 0.00241666;
                var addOrSub = Math.floor((Math.random() * 2) + 1);
                var lonOrLat = Math.floor((Math.random() * 2) + 1);
                var distance = ((isEven(user.dob.toString().slice(-1))) ? num : -num);
                ((lonOrLat === 1) ? user.lat += distance : user.lon += distance);
            });

            socketServer.emit('loggedInUsers', users);
        }, 40);
        socketServer.emit('loggedInUsers', {});

    }); // User.find({})


    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {
        var id = socket.request.session.passport.user;

    }


    socket.on('location', function(data) {
        if ("UserId: ", id, "logged in") {
            console.log(id);
        }
        console.log(data);
        // socketServer.emit('location', data);

    });



    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {
        var id = socket.request.session.passport.user;
        User.findById(id, function(error, user) {

            loggedInUsers[user.username] = true;
            socketServer.emit('loggedInUsers', loggedInUsers);


            socket.on('chatMessage', function(data) {
                console.log('message to server!', data);
                socketServer.emit('chatMessage', {
                    sender: user.username,
                    content: data
                });

            });


            socket.join(user.username);
            socket.on('whisper', function(data) {
                socketServer.to(data.recipient).emit('whisper', {
                    sender: user.username,
                    content: data.content
                });
            });

            socket.on('disconnect', function() {
                console.log('user disconnected');
                loggedInUsers[user.username] = false;
                socketServer.emit('loggedInUsers', loggedInUsers);

            }); //socket.on('disconnect'
        });
    } // if(loggedIn == true)

}); //socketServer.on("connection",