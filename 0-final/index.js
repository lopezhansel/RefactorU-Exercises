var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(express.static(__dirname + '/public'));


app.get('/', function(req, res) {
	res.sendFile('index.html');
});

var port = 80;
app.listen(port, function() {
	console.log('Server Started');
});