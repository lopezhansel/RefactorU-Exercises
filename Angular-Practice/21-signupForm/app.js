var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.get('/', function(req, res) {
	res.sendFile('form.html', {
		root: './public'
	});
	console.log('hellos');
});
app.post('/formsubmit', function(req, res) {
	// res.send('You are in the submit page')
	res.redirect('/success');
});
app.get('/success', function(req, res) {
	res.send('You were successful');
});
var port = 3000;
app.listen(port, function() {
	console.log('Server is Live on port:' + port);
});