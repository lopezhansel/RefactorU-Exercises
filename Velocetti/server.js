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
var loggedInUsers = { // This is Dummy Data to Render Some Users
    "563037f5369f0ff01e75fe7a": {
        "_id": "563037f5369f0ff01e75fe7a",
        "username": "goldengoose450",
        "password": "$2a$10$9qCjH7dc0oF1dznsYt5lzuYXGGcGxqpcdmdIXPfyglPcG.PsPDmZu",
        "gender": "female",
        
        "firstName": "sophia",
        "lastName": "armstrong",
        "email": "sophia.armstrong@example.com",
        "phone": "017687 22811",
        "cell": "0766-563-698",
        "lat": 39.7713888888890000,
        "lon": -105.1933333333300000,
        "pictureLg": "https://randomuser.me/api/portraits/women/52.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/women/52.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/women/52.jpg",
        "__v": 0
    },


    "563037f6369f0ff01e75fe7b": {
        "_id": "563037f6369f0ff01e75fe7b",
        "username": "silverduck220",
        "password": "$2a$10$nchS0zrYZag1NxDXOZzjzOLrQHdsUKRy6zNF.HAlm98DYcJsbDYqW",
        "gender": "female",
        
        "firstName": "jenny",
        "lastName": "lucas",
        "email": "jenny.lucas@example.com",
        "phone": "017684 94008",
        "cell": "0737-069-124",
        "lat": 40.0719444444440000,
        "lon": -105.3538888888900000,
        "pictureLg": "https://randomuser.me/api/portraits/women/85.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/women/85.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/women/85.jpg",
        "__v": 0
    },


    "563037f6369f0ff01e75fe7c": {
        "_id": "563037f6369f0ff01e75fe7c",
        "username": "blackelephant961",
        "password": "$2a$10$h.wgI4.6l1VZFS3Co5ISp.SlCtkMB7Ta8Gn7HGNBc4K0/o0Pd7Laq",
        "gender": "male",
        
        "firstName": "connor",
        "lastName": "hunter",
        "email": "connor.hunter@example.com",
        "phone": "016977 36986",
        "cell": "0748-146-281",
        "lat": 38.8500000000000010,
        "lon": -104.7500000000000000,
        "pictureLg": "https://randomuser.me/api/portraits/men/50.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/50.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/50.jpg",
        "__v": 0
    },


    "563037f6369f0ff01e75fe7d": {
        "_id": "563037f6369f0ff01e75fe7d",
        "username": "orangelion603",
        "password": "$2a$10$T6Ol12H0SFg..hb4tzZ6ZOZnc3HZnsAv2Kr1Z.nCZ501/P2jCl9RW",
        "gender": "male",
        
        "firstName": "edgar",
        "lastName": "king",
        "email": "edgar.king@example.com",
        "phone": "0151 346 2634",
        "cell": "0732-032-793",
        "lat": 39.7422222222219970,
        "lon": -104.9869444444400000,
        "pictureLg": "https://randomuser.me/api/portraits/men/44.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/44.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/44.jpg",
        "__v": 0
    },


    "563037f6369f0ff01e75fe7e": {
        "_id": "563037f6369f0ff01e75fe7e",
        "username": "greenostrich315",
        "password": "$2a$10$V9bmcB28ZYZon4SdV2AB1OwoMTUKh1B9HLe8T.X4QnEs/9/GxYMTS",
        "gender": "male",
        
        "firstName": "bobby",
        "lastName": "cook",
        "email": "bobby.cook@example.com",
        "phone": "013873 03346",
        "cell": "0703-268-904",
        "lat": 39.7915537000000010,
        "lon": -105.2007859000000000,
        "pictureLg": "https://randomuser.me/api/portraits/men/41.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/41.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/41.jpg",
        "__v": 0
    },


    "563037f6369f0ff01e75fe7f": {
        "_id": "563037f6369f0ff01e75fe7f",
        "username": "goldenpanda643",
        "password": "$2a$10$8asOf77EJYnfXSWL5hrVeuIv3LZmCFCLPK69mLXePQeshvFBzj54u",
        "gender": "male",
        
        "firstName": "marion",
        "lastName": "stephens",
        "email": "marion.stephens@example.com",
        "phone": "01507 42093",
        "cell": "0787-615-511",
        "lat": 38.8355555555559990,
        "lon": -104.8213888888900000,
        "pictureLg": "https://randomuser.me/api/portraits/men/47.jpg",
        "pictureMd": "https://randomuser.me/api/portraits/med/men/47.jpg",
        "pictureSm": "https://randomuser.me/api/portraits/thumb/men/47.jpg",
        "__v": 0
    },


};
var allRequests = {};

socketServer.use(function(socket, next) {
    app.sessionMiddleware(socket.request, {}, next);
});
function isEven(n) {return n % 2 === 0; }
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00


socketServer.on("connection", function(socket) {
    console.log("NEW SOCKET CONNECTION Adress: ", socket.handshake.address);
    var apiMe = "there";
    socket.emit('apiMe',apiMe);
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
        socket.emit('apiMe',apiMe);
        console.log("UserId Logged In",apiMe);
        console.log(" ");

        socket.on("newRequest", function(incoming) {
            console.log(incoming);
            console.log(" ");
            var newRequest       = {};
            newRequest.firstName       = incoming.firstName;
            newRequest.lastName       = incoming.lastName;
            newRequest.what       = incoming.what;
            newRequest.email     = incoming.email;
            newRequest.cell      = incoming.cell;
            newRequest.lat       = incoming.lat;
            newRequest.lon       = incoming.lon;
            newRequest.timeStamp = incoming.timeStamp;
            newRequest.pictureMd = incoming.pictureMd;
            allRequests[incoming.timeStamp] = newRequest;
            console.log(allRequests);
            socketServer.emit('allRequests',allRequests);
            // socketServer.emit('allU')
        });////socket.on("newRequest",
        socket.emit('allRequests',allRequests);

        User.findById(apiMe, function(error, userDoc) {
            console.log(userDoc);
            userDoc.password = null;
            loggedInUsers[apiMe] = userDoc;
            socket.emit('apiMe',userDoc);
            socketServer.emit('allUsers',loggedInUsers);
        });//// User.findById(apiMe


        socket.on("myLocation", function(userLocation) {
            // console.log(userLocation);
            loggedInUsers[apiMe].lat = userLocation.lat;
            loggedInUsers[apiMe].lon = userLocation.lon;
            loggedInUsers[apiMe].timeStamp = userLocation.timeStamp;
            // console.log(loggedInUsers);
            socketServer.emit('allUsers',loggedInUsers);
            // socketServer.emit('allUsers',loggedInUsers);
        });////socket.on("myLocation",

        socket.on('disconnect', function() {
            console.log('user disconnected');
            delete  loggedInUsers[apiMe] ;
            socketServer.emit('loggedInUsers', loggedInUsers);
        }); //////socket.on('disconnect'


    }////if (socket.request.session &&
}); ////socketServer.on("connection",



// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
