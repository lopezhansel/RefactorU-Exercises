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
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00



var port = 80;
app.server = app.listen(port, function() {
    console.log('Final Started', Date.now());
});

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

var io = require("socket.io");
var socketServer = io(app.server);
var loggedInUsers = {};

socketServer.use(function(socket, next) {
    app.sessionMiddleware(socket.request, {}, next);
});

var sendUser = [{
    __v        : 0,
    pictureSm  : 'https://randomuser.me/api/portraits/thumb/women/52.jpg',
    pictureMd  : 'https://randomuser.me/api/portraits/med/women/52.jpg',
    pictureLg  : 'https://randomuser.me/api/portraits/women/52.jpg',
    lon        : -105,
    lat        : 40.015,
    cell       : '0766-563-698',
    phone      : '017687 22811',
    email      : 'sophia.armstrong@example.com',
    lastName   : 'armstrong',
    firstName  : 'sophia',
    dob        : 2281986,
    gender     : 'female',
    password   : '$2a$10$9qCjH7dc0oF1dznsYt5lzuYXGGcGxqpcdmdIXPfyglPcG.PsPDmZu',
    username   : 'goldengoose450',
}]; //sendUser

//  one mile is about  .0145 degrees


socketServer.on("connection", function(socket) {
            User.find({}).limit(100).exec(function(err, users) {
                socketServer.emit('loggedInUsers', users);
                setInterval(function() {
                    users.forEach(function (user) {
                        // randomNum = Math.floor((Math.random() * 2) + 1);
                        // ((randomNum ===1 ) ? user.lat  += 0.00241666 : user.lon  += 0.00241666)
                        // var num = 0.00241666;
                        var num = 0.00011666;

                        var addOrSub = Math.floor((Math.random() * 2) + 1);
                        var lonOrLat = Math.floor((Math.random() * 2) + 1);
                        var distance = ((addOrSub === 1)? num : -num);
                        ((lonOrLat === 1 ) ? user.lat  += distance : user.lon  += distance);

                        // user.lat  += 0.00241666;
                        // user.lon  += 0.00241666;
                    });
                    // console.log(users[0].lat  += 0.00241666);
                    // console.log(users[0].lat  -= 0.00001);
                    socketServer.emit('loggedInUsers', users);
                }, 5);
                console.log(users);
                socketServer.emit('loggedInUsers', {});

            }); // User.find({})


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