var express    = require('express');
var bodyParser = require('body-parser');
var mongoose   = require('mongoose');
var db         = require('./models/applicantsDb');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {
	res.sendFile('html/index.html', {
		root: './public'
	});
});


app.get('/applicants', function(req, res) {
	res.sendFile('html/applicants.html', {
		root: './public'
	});
});


app.get('/success', function(req, res) {
	res.send('Thank you for applying, we will review you application shortly.');
});

app.post('/applicant', function(req, res) {
	console.log(req.body);
	res.redirect('/success');
});



var port = 3000;
app.listen(port, function() {
	console.log('Server running on port ' + port);

});