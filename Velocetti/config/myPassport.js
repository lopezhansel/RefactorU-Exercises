var app = require("../server");
var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcryptjs');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/userModel');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.sessionMiddleware = session({
    secret: 'pR3t3nDc0mPl3xP4ssw0rD',
    resave: false,
    saveUninitialized: true,
});

app.use(app.sessionMiddleware);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy(
    function(username, password, done) {
        User.findOne({
            username: username
        }, function(err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'Incorrect username.'
                });
            }
            bcrypt.compare(password, user.password, function(error, response) {
                if (response === true) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        });
    }
));

app.isAuthenticated = function(req, res, next) {
    console.log(req.isAuthenticated(), req.session);
    if (req.isAuthenticated()) {
        console.log("login");
        return next();
    }
    res.redirect('/');
};
app.isAuthenticatedAjax = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.send({
        error: 'not logged in'
    });
};

app.get('/', function(req, res) {
    res.sendFile('/views/index.html', {
        root: './public'
    });
});

app.post('/signup', function(req, res) {
    console.log(req.body);
    bcrypt.genSalt(10, function(error, salt) {
        bcrypt.hash(req.body.password, salt, function(hashError, hash) {
            console.log(req.body.pictureMd);
            var newUser = new User({
                username: req.body.username,
                password: hash,
                gender: req.body.gender,
                dob: req.body.dob,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                phone: req.body.phone,
                cell: req.body.cell,
                lat: req.body.lat,
                lon: req.body.lon,
                // pictureLg: req.body.picture.large,
                pictureMd: req.body.pictureMd,
                // pictureSm: req.body.picture.thumbnail,
            });
            newUser.save(function(saveErr, user) {
                if (saveErr) {
                    res.send({
                        err: saveErr
                    });
                } else {
                    req.login(user, function(loginErr) {
                        if (loginErr) {
                            res.send({
                                err: loginErr
                            });
                        } else {
                            res.redirect('/');
                        }
                    });
                }
            });

        });
    });
});

app.get('/logout',function   (req,res ) {
        req.logout();
        res.redirect('/');
});

app.post('/login', function(req, res, next) {
    console.log(req.body);
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.send({error: 'Incorrect Try Again. '});
        }
        req.logIn(user, function(err) {
            if (err) {
                return next(err);
            }
            return  res.redirect('/');
            // res.send({success: 'success'});
        });
    })(req, res, next);
});

app.get('/restricted', app.isAuthenticated, function(req, res) {
    res.sendFile('/views/restrictedView.html', {
        root: './public'
    });
});


app.get('/api/me', app.isAuthenticatedAjax, function(req, res) {
    res.send({
        user: req.user
    });
    console.log("/api/me route");
});
// app.get('/allUsers', app.isAuthenticated, function(req, res) {
//     console.log("Here");
    // User.find({},function  (err,docs) {
    //     console.log(docs);
    //     res.send(docs);
    // }) ;
//       console.log("/api/me route");
// });

module.exports = app;