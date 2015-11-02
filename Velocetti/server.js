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


    // "563037f6369f0ff01e75fe80": {
    //     "_id": "563037f6369f0ff01e75fe80",
    //     "username": "tinygorilla394",
    //     "password": "$2a$10$2wEWUdpHEmNn4TxxFgSIzunJAveJPwX37ZGwr/caNWTlhejp925Xu",
    //     "gender": "female",
        
    //     "firstName": "zoe",
    //     "lastName": "hopkins",
    //     "email": "zoe.hopkins@example.com",
    //     "phone": "013873 81612",
    //     "cell": "0759-090-576",
    //     "lat": 38.8922120000000010,
    //     "lon": -104.7994833333300000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/88.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/88.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/88.jpg",
    //     "__v": 0
    // },


    // "563037f7369f0ff01e75fe81": {
    //     "_id": "563037f7369f0ff01e75fe81",
    //     "username": "yellowrabbit351",
    //     "password": "$2a$10$uxLCZ4fltoswPLbiWq1znukJlEQBuL6FirvqECyJegzjYk9r4Mcay",
    //     "gender": "female",
        
    //     "firstName": "catherine",
    //     "lastName": "jackson",
    //     "email": "catherine.jackson@example.com",
    //     "phone": "017683 47089",
    //     "cell": "0726-518-459",
    //     "lat": 38.8230000000000000,
    //     "lon": -104.7030000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/36.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/36.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/36.jpg",
    //     "__v": 0
    // },


    // "563037f7369f0ff01e75fe82": {
    //     "_id": "563037f7369f0ff01e75fe82",
    //     "username": "crazygorilla699",
    //     "password": "$2a$10$Yk3M34AIikM/U5CmK5JZf.BV8rwkC5gh.UAUioBARfQl02m12eBQS",
    //     "gender": "male",
        
    //     "firstName": "nick",
    //     "lastName": "west",
    //     "email": "nick.west@example.com",
    //     "phone": "015242 47351",
    //     "cell": "0780-423-677",
    //     "lat": 39.7447000000000020,
    //     "lon": -104.9880000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/17.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/17.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/17.jpg",
    //     "__v": 0
    // },


    // "563037f7369f0ff01e75fe83": {
    //     "_id": "563037f7369f0ff01e75fe83",
    //     "username": "lazyfish598",
    //     "password": "$2a$10$2xgiTfscEGqoa1Btf2i/Fu0ax/bzp9S2xKdJQNV6n0OXTPiVw1GsC",
    //     "gender": "male",
        
    //     "firstName": "charlie",
    //     "lastName": "jensen",
    //     "email": "charlie.jensen@example.com",
    //     "phone": "01656 127474",
    //     "cell": "0772-338-813",
    //     "lat": 40.0037222222220020,
    //     "lon": -105.2625000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/23.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/23.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/23.jpg",
    //     "__v": 0
    // },


    // "563037f7369f0ff01e75fe84": {
    //     "_id": "563037f7369f0ff01e75fe84",
    //     "username": "smallelephant483",
    //     "password": "$2a$10$ZflEOMZZ3tlpe4aXObKgneXi/3/2fTUjUat5FuZmBVPOhf.3xDMnC",
    //     "gender": "male",
        
    //     "firstName": "eduardo",
    //     "lastName": "holland",
    //     "email": "eduardo.holland@example.com",
    //     "phone": "013873 86434",
    //     "cell": "0704-307-051",
    //     "lat": 38.8422222222219990,
    //     "lon": -104.7975000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/95.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/95.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/95.jpg",
    //     "__v": 0
    // },


    // "563037f7369f0ff01e75fe85": {
    //     "_id": "563037f7369f0ff01e75fe85",
    //     "username": "crazyrabbit295",
    //     "password": "$2a$10$I5Lb/Il8BOeRzjB6LCOWSuKkmMi56AJIOMRR95KvLK6jvat.eVSA.",
    //     "gender": "female",
        
    //     "firstName": "tracy",
    //     "lastName": "holland",
    //     "email": "tracy.holland@example.com",
    //     "phone": "022 0103 0146",
    //     "cell": "0756-125-303",
    //     "lat": 39.7447222222220020,
    //     "lon": -104.9838888888899900,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/27.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/27.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/27.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe86": {
    //     "_id": "563037f8369f0ff01e75fe86",
    //     "username": "purplerabbit937",
    //     "password": "$2a$10$pf7AbRPieDwNdex3WfRV3eRA2VlLQ.jg/LRWtQHx26M2mPAyBEXvC",
    //     "gender": "male",
        
    //     "firstName": "fernando",
    //     "lastName": "murray",
    //     "email": "fernando.murray@example.com",
    //     "phone": "013873 04416",
    //     "cell": "0766-246-508",
    //     "lat": 40.0433333333330030,
    //     "lon": -105.2408333333300000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/60.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/60.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/60.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe87": {
    //     "_id": "563037f8369f0ff01e75fe87",
    //     "username": "yellowelephant311",
    //     "password": "$2a$10$PBywQ81FOATUXCpn4leOI.va7hCbMKtLX6ywGDSg51CGwB5Y/h2Hu",
    //     "gender": "female",
        
    //     "firstName": "allie",
    //     "lastName": "schmidt",
    //     "email": "allie.schmidt@example.com",
    //     "phone": "019467 58497",
    //     "cell": "0729-302-780",
    //     "lat": 39.8269444444440030,
    //     "lon": -105.0813888888900000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/44.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/44.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/44.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe88": {
    //     "_id": "563037f8369f0ff01e75fe88",
    //     "username": "silverleopard422",
    //     "password": "$2a$10$y.WrCPmzWD/rOaqNRcE85e7oEHvrCL8lVIloOrtvQAREggoL3f8c.",
    //     "gender": "female",
        
    //     "firstName": "rosalyn",
    //     "lastName": "perry",
    //     "email": "rosalyn.perry@example.com",
    //     "phone": "015395 46885",
    //     "cell": "0732-898-080",
    //     "lat": 39.8272222222219980,
    //     "lon": -105.0380555555600100,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/63.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/63.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/63.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe89": {
    //     "_id": "563037f8369f0ff01e75fe89",
    //     "username": "crazywolf581",
    //     "password": "$2a$10$qE8ublXi4xifDrQWQxLP8OuHCXjxriJP4X3jMshllvJKwriqGeGL2",
    //     "gender": "male",
        
    //     "firstName": "bill",
    //     "lastName": "mason",
    //     "email": "bill.mason@example.com",
    //     "phone": "017687 66101",
    //     "cell": "0793-095-579",
    //     "lat": 38.8430000000000040,
    //     "lon": -104.7600000000000100,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/42.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/42.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/42.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe8a": {
    //     "_id": "563037f8369f0ff01e75fe8a",
    //     "username": "crazyfrog828",
    //     "password": "$2a$10$Y691neCbJxWkcd2r8F/2UOL0njvlQgPOQqnHKpAuKFFsyrN.33ehm",
    //     "gender": "female",
        
    //     "firstName": "sophie",
    //     "lastName": "wilson",
    //     "email": "sophie.wilson@example.com",
    //     "phone": "017684 29638",
    //     "cell": "0783-069-922",
    //     "lat": 40.0080350000000000,
    //     "lon": -105.2764789999999900,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/91.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/91.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/91.jpg",
    //     "__v": 0
    // },


    // "563037f8369f0ff01e75fe8b": {
    //     "_id": "563037f8369f0ff01e75fe8b",
    //     "username": "bigleopard416",
    //     "password": "$2a$10$l6necFm4S/McbAu2Kb7gHO9SCMEk2/b/o7YfPtp2To1XfE/gTmmqe",
    //     "gender": "male",
        
    //     "firstName": "ralph",
    //     "lastName": "hoffman",
    //     "email": "ralph.hoffman@example.com",
    //     "phone": "017687 28643",
    //     "cell": "0718-560-810",
    //     "lat": 38.8261111111109970,
    //     "lon": -104.7413888888900000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/70.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/70.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/70.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe8c": {
    //     "_id": "563037f9369f0ff01e75fe8c",
    //     "username": "whiteladybug451",
    //     "password": "$2a$10$oimCOsCLyBha4pr3sxaMZey47pW.kCIvwXPPZoX9jtaJfx0vFCBGG",
    //     "gender": "female",
        
    //     "firstName": "elizabeth",
    //     "lastName": "morgan",
    //     "email": "elizabeth.morgan@example.com",
    //     "phone": "01279 97126",
    //     "cell": "0779-138-847",
    //     "lat": 39.7447222222220020,
    //     "lon": -104.9950000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/59.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/59.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/59.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe8d": {
    //     "_id": "563037f9369f0ff01e75fe8d",
    //     "username": "purpleladybug866",
    //     "password": "$2a$10$0Lk866eFMjxPJIzUZRY7QOuOYrbBSZ/PjidDphyzAPIQDaMdRnlY2",
    //     "gender": "female",
        
    //     "firstName": "jessica",
    //     "lastName": "west",
    //     "email": "jessica.west@example.com",
    //     "phone": "01493 43611",
    //     "cell": "0767-370-778",
    //     "lat": 39.7430555555559980,
    //     "lon": -104.9858333333300100,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/40.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/40.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/40.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe8e": {
    //     "_id": "563037f9369f0ff01e75fe8e",
    //     "username": "reddog578",
    //     "password": "$2a$10$xnJRzWp5LmsT18LG6nr.uuK0YWzeGCpuvjWSMVPlYunYUFDmfjOeq",
    //     "gender": "female",
        
    //     "firstName": "evy",
    //     "lastName": "van zwieten",
    //     "email": "evy.van zwieten@example.com",
    //     "phone": "(307)-895-6565",
    //     "cell": "(653)-598-4377",
    //     "lat": 39.6785000000000000,
    //     "lon": -105.9200000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/38.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/38.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/38.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe8f": {
    //     "_id": "563037f9369f0ff01e75fe8f",
    //     "username": "brownladybug791",
    //     "password": "$2a$10$D.928Y9Kc8Xg2RGxWXn5Iecz/YUzndflnrN8qGcpPUe4JIZyHmtMW",
    //     "gender": "female",
        
    //     "firstName": "kristen",
    //     "lastName": "kramers",
    //     "email": "kristen.kramers@example.com",
    //     "phone": "(764)-516-2785",
    //     "cell": "(909)-919-0530",
    //     "lat": 38.8282916666669990,
    //     "lon": -104.8316333333300000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/4.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/4.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/4.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe90": {
    //     "_id": "563037f9369f0ff01e75fe90",
    //     "username": "heavymeercat968",
    //     "password": "$2a$10$5yvEZIhuwgRwrRTfbE3RJ.SwF0HOelB8O6G8j2UkePZsV5fnXVJNC",
    //     "gender": "male",
        
    //     "firstName": "matthé",
    //     "lastName": "de nooij",
    //     "email": "matthé.de nooij@example.com",
    //     "phone": "(501)-630-0891",
    //     "cell": "(149)-454-2689",
    //     "lat": 40.0028560000000010,
    //     "lon": -105.2641540000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/62.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/62.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/62.jpg",
    //     "__v": 0
    // },


    // "563037f9369f0ff01e75fe91": {
    //     "_id": "563037f9369f0ff01e75fe91",
    //     "username": "brownsnake705",
    //     "password": "$2a$10$uovuG/Egw1nKWsj0Skm5/OYXEeffeTwVu6DCHlC6C9C3OuT43Z8ru",
    //     "gender": "female",
        
    //     "firstName": "rebekka",
    //     "lastName": "bloem",
    //     "email": "rebekka.bloem@example.com",
    //     "phone": "(542)-251-1436",
    //     "cell": "(615)-693-9355",
    //     "lat": 39.8097088000000030,
    //     "lon": -105.1260966000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/63.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/63.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/63.jpg",
    //     "__v": 0
    // },


    // "563037fa369f0ff01e75fe92": {
    //     "_id": "563037fa369f0ff01e75fe92",
    //     "username": "smallgorilla569",
    //     "password": "$2a$10$6PX3GvLDx92.KZ9Tm3MtTeG8VgkdISxvYSywDyZM9igmbWozYiz/e",
    //     "gender": "male",
        
    //     "firstName": "zeno",
    //     "lastName": "emans",
    //     "email": "zeno.emans@example.com",
    //     "phone": "(432)-777-6197",
    //     "cell": "(857)-207-6050",
    //     "lat": 38.8350000000000010,
    //     "lon": -104.8070000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/22.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/22.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/22.jpg",
    //     "__v": 0
    // },


    // "563037fb369f0ff01e75fe93": {
    //     "_id": "563037fb369f0ff01e75fe93",
    //     "username": "beautifulgoose202",
    //     "password": "$2a$10$2Q/xSbK.7mwO4JrVU94HaeK7jF22FQqKTbSzdc.Q9jaIbQE5kPUA2",
    //     "gender": "male",
        
    //     "firstName": "peter",
    //     "lastName": "knulst",
    //     "email": "peter.knulst@example.com",
    //     "phone": "(135)-743-6133",
    //     "cell": "(162)-027-9210",
    //     "lat": 40.0066666666670020,
    //     "lon": -105.2672222222200000,
    //     "pictureLg": "https://randomuser.me/api/portraits/men/39.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/men/39.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/men/39.jpg",
    //     "__v": 0
    // },


    // "563037fb369f0ff01e75fe94": {
    //     "_id": "563037fb369f0ff01e75fe94",
    //     "username": "beautifulpeacock598",
    //     "password": "$2a$10$1p.5ZA1wXawd9W1S7MJ5NeSXL0aRghowGhKj6IaHcEXMMVxTvmt0W",
    //     "gender": "female",
        
    //     "firstName": "carlotta",
    //     "lastName": "mol",
    //     "email": "carlotta.mol@example.com",
    //     "phone": "(319)-057-0399",
    //     "cell": "(560)-644-0007",
    //     "lat": 38.8973799999999980,
    //     "lon": -104.8113599999999900,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/64.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/64.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/64.jpg",
    //     "__v": 0
    // },


    // "563037fb369f0ff01e75fe95": {
    //     "_id": "563037fb369f0ff01e75fe95",
    //     "username": "redgoose133",
    //     "password": "$2a$10$Pzv/tyeFkVnxtjuRiQEvk.5dCHMFTrOkMsVrk/qDezJklMv.tLvz2",
    //     "gender": "female",
        
    //     "firstName": "athina",
    //     "lastName": "blokland",
    //     "email": "athina.blokland@example.com",
    //     "phone": "(633)-206-8441",
    //     "cell": "(041)-191-3755",
    //     "lat": 38.8105555555560000,
    //     "lon": -104.8352777777799900,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/33.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/33.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/33.jpg",
    //     "__v": 0
    // },


    // "563037fb369f0ff01e75fe96": {
    //     "_id": "563037fb369f0ff01e75fe96",
    //     "username": "silverladybug215",
    //     "password": "$2a$10$WQrf8fYaxmCyjNvQKeNtmuUbKZcKVKS2WuAUecbvcT9mAnfeyAdbK",
    //     "gender": "female",
        
    //     "firstName": "kathryn",
    //     "lastName": "feringa",
    //     "email": "kathryn.feringa@example.com",
    //     "phone": "(552)-596-9101",
    //     "cell": "(006)-132-7432",
    //     "lat": 39.8872000000000000,
    //     "lon": -105.0665000000000000,
    //     "pictureLg": "https://randomuser.me/api/portraits/women/29.jpg",
    //     "pictureMd": "https://randomuser.me/api/portraits/med/women/29.jpg",
    //     "pictureSm": "https://randomuser.me/api/portraits/thumb/women/29.jpg",
    //     "__v": 0
    // }
};

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

    if (socket.request.session && socket.request.session.passport && socket.request.session.passport.user) {
        apiMe = socket.request.session.passport.user;
        socket.emit('apiMe',apiMe);
        console.log("UserId Logged In",apiMe);

        User.findById(apiMe, function(error, userDoc) {
            socket.emit('apiMe',userDoc.firstName);
            userDoc.password = null;
            loggedInUsers[apiMe] = userDoc;

            socketServer.emit('allUsers',loggedInUsers);
        });//// User.findById(apiMe

        socket.on("myLocation", function(userLocation) {
            // console.log(userLocation);
            loggedInUsers[apiMe].lat = userLocation.lat;
            loggedInUsers[apiMe].lon = userLocation.lon;
            loggedInUsers[apiMe].timeStamp = userLocation.timeStamp;
            console.log(loggedInUsers);
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
