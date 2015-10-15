var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
// var mongoose   = require('mongoose');

var phoneCtrl  = require('./controllers/phoneCtrl');
// mongoose.connect('mongodb://localhost/phoneDb');
var app = express();

app.use(session({
	secret            : 'c0mPlexP4$$Word',
	resave            : true,
	saveUninitialized : false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get('/',function  (req,res) {
	console.log('this router is redundants ughs');
});

app.post('/api/createPhones', phoneCtrl.createPhones);
app.get('/api/readPhones',phoneCtrl.readPhones);


var port = 3000;
app.listen(port, function() {
	console.log('meanServer: ',port);
});