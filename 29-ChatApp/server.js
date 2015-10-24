var express = require('express');
var app = express();
// module.exports = app;

app.use(express.static(__dirname + '/public'));


var session = require('express-session');

app.sessionMiddleware = session({
  secret: 'c0mPl3xP4ssw0rD',
  resave: false,
  saveUninitialized: true,
});
app.use(app.sessionMiddleware);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/chat');

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});
var User = mongoose.model('user', userSchema);

app.server = app.listen(3000);