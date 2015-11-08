//console.log = function () {};
var express = require('express');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/velociti');
var User = require('./models/userModel');
var Request = require('./models/requestModel');
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
var loggedInUsers = {

    "563037f8369f0ff01e75fe8a": {
        "_id": "563037f8369f0ff01e75fe8a",
        "username": "crazyfrog828",
        "password": "$2a$10$Y691neCbJxWkcd2r8F/2UOL0njvlQgPOQqnHKpAuKFFsyrN.33ehm",
        "gender": "female",

        "firstName": "sophie",
        "lastName": "wilson",
        "email": "sophie.wilson@example.com",
        "phone": "017684 29638",
        "cell": "0783-069-922",
        "lat": 40.0080350000000000,
        "lon": -105.2764789999999900,
        "pictureLg": "https://randomuser.me/api/portraits/women/91.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/women/91.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/women/91.jpg",
        "__v": 0
    },



    "563037f6369f0ff01e75fe80": {
        "_id": "563037f6369f0ff01e75fe80",
        "username": "tinygorilla394",
        "password": "$2a$10$2wEWUdpHEmNn4TxxFgSIzunJAveJPwX37ZGwr/caNWTlhejp925Xu",
        "gender": "female",

        "firstName": "zoe",
        "lastName": "hopkins",
        "email": "zoe.hopkins@example.com",
        "phone": "013873 81612",
        "cell": "0759-090-576",
        "lat": 38.8922120000000010,
        "lon": -104.7994833333300000,
        "pictureLg": "https://randomuser.me/api/portraits/women/88.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/women/88.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/women/88.jpg",
        "__v": 0
    },
    "563037f9369f0ff01e75fe8f": {
        "_id": "563037f9369f0ff01e75fe8f",
        "username": "brownladybug791",
        "password": "$2a$10$D.928Y9Kc8Xg2RGxWXn5Iecz/YUzndflnrN8qGcpPUe4JIZyHmtMW",
        "gender": "female",

        "firstName": "kristen",
        "lastName": "kramers",
        "email": "kristen.kramers@example.com",
        "phone": "(764)-516-2785",
        "cell": "(909)-919-0530",
        "lat": 38.8282916666669990,
        "lon": -104.8316333333300000,
        "pictureLg": "https://randomuser.me/api/portraits/women/4.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/women/4.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/women/4.jpg",
        "__v": 0
    },

    "563037f8369f0ff01e75fe8b": {
        "_id": "563037f8369f0ff01e75fe8b",
        "username": "bigleopard416",
        "password": "$2a$10$l6necFm4S/McbAu2Kb7gHO9SCMEk2/b/o7YfPtp2To1XfE/gTmmqe",
        "gender": "male",

        "firstName": "ralph",
        "lastName": "hoffman",
        "email": "ralph.hoffman@example.com",
        "phone": "017687 28643",
        "cell": "0718-560-810",
        "lat": 38.8261111111109970,
        "lon": -104.7413888888900000,
        "pictureLg": "https://randomuser.me/api/portraits/men/70.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/70.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/70.jpg",
        "__v": 0
    },

    "563037f9369f0ff01e75fe90": {
        "_id": "563037f9369f0ff01e75fe90",
        "username": "heavymeercat968",
        "password": "$2a$10$5yvEZIhuwgRwrRTfbE3RJ.SwF0HOelB8O6G8j2UkePZsV5fnXVJNC",
        "gender": "male",

        "firstName": "matthé",
        "lastName": "de nooij",
        "email": "matthé.de nooij@example.com",
        "phone": "(501)-630-0891",
        "cell": "(149)-454-2689",
        "lat": 40.0028560000000010,
        "lon": -105.2641540000000000,
        "pictureLg": "https://randomuser.me/api/portraits/men/62.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/62.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/62.jpg",
        "__v": 0
    },

    "563037f7369f0ff01e75fe83": {
        "_id": "563037f7369f0ff01e75fe83",
        "username": "lazyfish598",
        "password": "$2a$10$2xgiTfscEGqoa1Btf2i/Fu0ax/bzp9S2xKdJQNV6n0OXTPiVw1GsC",
        "gender": "male",

        "firstName": "charlie",
        "lastName": "jensen",
        "email": "charlie.jensen@example.com",
        "phone": "01656 127474",
        "cell": "0772-338-813",
        "lat": 40.0037222222220020,
        "lon": -105.2625000000000000,
        "pictureLg": "https://randomuser.me/api/portraits/men/23.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/23.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/23.jpg",
        "__v": 0
    }



};
var allRequests = {};

socketServer.use(function(socket, next) {
    app.sessionMiddleware(socket.request, {}, next);
});

function isEven(n) {
    return n % 2 === 0;
}
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00


socketServer.on("connection", function(socket) {
    console.log("NEW SOCKET CONNECTION Adress: ", socket.handshake.address);
    var apiMe = "there";
    socket.emit('apiMe', apiMe);
    // var apiMe = {
    //     "_id": undefined,
    //     "username": undefined,
    //     "password": undefined,
    //     "gender": undefined,
    //     "firstName": undefined,
    //     "lastName": undefined,
    //     "email": undefined,
    //     "phone": undefined,
    //     "cell": undefined,
    //     "lat": undefined,
    //     "lon": undefined,
    //     "pictureLg": undefined,
    //     "pictureMd": undefined,
    //     "pictureSm": undefined,
    //     "__v": undefined,
    // };

    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {

        apiMe = socket.request.session.passport.user;
        socket.emit('apiMe', apiMe);
        console.log("UserId Logged In", apiMe);
        console.log(" ");

        socket.on("newRequest", function(incoming) {
            console.log(incoming);
            console.log(" ");
            var newRequest = {};
            newRequest.firstName = incoming.firstName;
            newRequest.lastName = incoming.lastName;
            newRequest.what = incoming.what;
            newRequest.email = incoming.email;
            newRequest.cell = incoming.cell;
            newRequest.lat = incoming.lat;
            newRequest.lon = incoming.lon;
            newRequest.timeStamp = incoming.timeStamp;
            newRequest.pictureMd = incoming.pictureMd;
            allRequests[incoming.timeStamp] = newRequest;
            // console.log(allRequests);
            socketServer.emit('allRequests', allRequests);
            // socketServer.emit('allU')
        }); ////socket.on("newRequest",
        socket.emit('allRequests', allRequests);
        
        socket.on('deleteRequest', function(request) {
            // if  (apiMe._id === request._id) {} // So Users  can only delete their own Request
            delete allRequests[request.timeStamp] ;
            socketServer.emit('allRequests', allRequests);
        }); //////socket.on('disconnect'

        User.findById(apiMe, function(error, userDoc) {
            console.log(userDoc);
            userDoc.password = null;
            loggedInUsers[apiMe] = userDoc;

            socket.emit('apiMe', userDoc);
            socketServer.emit('allUsers', loggedInUsers);
        }); //// User.findById(apiMe


        socket.on("myLocation", function(userLocation) {
            // console.log(userLocation);
            if (apiMe) {
                loggedInUsers[apiMe].lat = userLocation.lat;
                loggedInUsers[apiMe].lon = userLocation.lon;
                loggedInUsers[apiMe].timeStamp = userLocation.timeStamp;
            }
            // console.log(loggedInUsers);
            socketServer.emit('allUsers', loggedInUsers);
            // socketServer.emit('allUsers',loggedInUsers);
        }); ////socket.on("myLocation",
        

        socket.on('disconnect', function() {
            console.log('user disconnected');
            delete loggedInUsers[apiMe];
            socketServer.emit('allUsers', loggedInUsers);
        }); //////socket.on('disconnect'


    } ////if (socket.request.session &&
}); ////socketServer.on("connection",



// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00