var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();


// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));
app.sessionMiddleware = session({secret: 'pR3t3nDc0mPl3xP4ssw0rD', resave: false, saveUninitialized: true, });

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/velociti');
var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
    gender    : String,
    dob       : Number,
    firstName : String,
    lastName  : String,
    email     : String,
    phone     : String,
    cell      : String,
    pictureLg : String,
    pictureMd : String,
    pictureSm : String,
    lat       : Number,
    lon       : Number
});
var User = mongoose.model('user', userSchema);

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00
var bcrypt = require('bcryptjs');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
app.use( passport.initialize() );
app.use( passport.session()    );

passport.serializeUser( function(user, done) { done(null, user.id) ;});
passport.deserializeUser( function(id, done) {
    User.findById(id, function(err, user) {done(err, user); });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({ username: username }, function (err, user) {
            if (err) { return done(err); }
            if (!user) {return done(null, false, { message: 'Incorrect username.' }); }
            bcrypt.compare(password, user.password, function(error, response){
                if ( response === true ){ return done( null,user ); }
                else {return done(null, false); }
            });
        });
    }
));

app.isAuthenticated = function(req, res, next){
    if(req.isAuthenticated()){return next(); }
    res.redirect('/');
};
app.isAuthenticatedAjax = function(req, res, next){
    if(req.isAuthenticated()){return next(); }
    res.send({error:'not logged in'});
};


// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

app.get('/', function (req, res) { res.sendFile('/views/login.html', {root: './public'}); });
 

app.post('/signup', function(req, res){
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
                gender    : req.body.gender,
                dob       : req.body.dob,
                firstName : req.body.name.first,
                lastName  : req.body.name.last,
                email     : req.body.email,
                phone     : req.body.phone,
                cell      : req.body.cell,
                lat       : req.body.lat,
                lon       : req.body.lonn,
                pictureLg : req.body.picture.large,
                pictureMd : req.body.picture.medium,
                pictureSm : req.body.picture.thumbnail,
            });

            newUser.save(function(saveErr, user){
                if ( saveErr ) { res.send({ err:saveErr }); }
                else { 
                    req.login(user, function(loginErr){
                        if ( loginErr ) { res.send({ err:loginErr }); }
                        else { res.send({success: 'success'}); }
                    });
                }
            });
            
        });
    });
}); 



app.post('/login', function(req, res, next){




    passport.authenticate('local', function(err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.send({error : 'something went wrong :('}); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.send({success:'success'});
        });
    })(req, res, next);
});

app.get('/chat', app.isAuthenticated, function(req, res){
    res.sendFile('/views/chat.html', {root: './public'});
});

app.get('/api/me', app.isAuthenticatedAjax, function(req, res){
    res.send({user:req.user});
});


var port = 80;
app.server = app.listen(port, function() {console.log('Final Started',Date.now() ); });


var io = require("socket.io");
var socketServer = io(app.server);
var loggedInUsers = {HANSEL: "HELI"};

socketServer.use(function(socket, next){
    app.sessionMiddleware(socket.request, {}, next);
});

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00



socketServer.on("connection", function(socket){
   User.find({},function  (err,users) {
       socketServer.emit('loggedInUsers', users);

   });


    if ( socket.request.session && socket.request.session.passport && socket.request.session.passport.user ) {
        var id = socket.request.session.passport.user;
        User.findById(id, function(error, user){

            loggedInUsers[user.username] = true;
            socketServer.emit('loggedInUsers', loggedInUsers);


            socket.on('chatMessage', function(data){
                console.log('message to server!', data);
                socketServer.emit('chatMessage', {sender:user.username,content:data});

            });

            
            socket.join(user.username);
            socket.on('whisper', function(data){
                socketServer.to(data.recipient).emit('whisper', {
                    sender  : user.username,
                    content : data.content
                });
            });

            socket.on('disconnect', function(){
                console.log('user disconnected');
                loggedInUsers[user.username] = false;
                socketServer.emit('loggedInUsers', loggedInUsers);

            });
        });
    }

});

// #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00  #FFFF00

