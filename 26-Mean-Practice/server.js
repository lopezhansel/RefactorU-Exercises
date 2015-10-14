var express    = require('express');
var bodyParser = require('body-parser');
var session    = require('express-session');
var mongoose   = require('mongoose');

mongoose.connect('mongodb://localhost/practiceMean');
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
	console.log('at home');
	res.send('welcome to my home page');
});

app.get('/',function  (req,res) {
	console.log('at home');
	res.send('welcome to my home page');
});

var port = 3000;
app.listen(port, function() {
	console.log('meanServer: ',port);
});