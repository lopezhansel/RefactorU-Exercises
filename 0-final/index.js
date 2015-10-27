var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var app = express();

// == MiddelWare START == //
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.static(__dirname + '/public'));
app.sessionMiddleware = session({secret: 'pR3t3nDc0mPl3xP4ssw0rD', resave: false, saveUninitialized: true, });
	
// == MODELS START == //
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/velociti');
var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true },
});
var User = mongoose.model('user', userSchema);
// == MODELS END == //

// == PASSPORT START == //
var bcrypt = require('bcryptjs');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;
app.use( passport.initialize() );
app.use( passport.session()    );

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
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
// == PASSPORT End == //


// app.get('/', function (req, res) { res.sendFile('index.html'); });
app.get('/', function (req, res) { res.sendFile('/views/login.html', {root: './public'}); });


app.post('/signup', function(req, res){
    bcrypt.genSalt(10, function(error, salt){
        bcrypt.hash(req.body.password, salt, function(hashError, hash){
            var newUser = new User({
                username: req.body.username,
                password: hash,
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
app.server = app.listen(port, function() {
	console.log('Server Started');
});