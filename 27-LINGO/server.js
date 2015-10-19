var express    = require('express');
var bodyParser = require('body-parser');
var app        = express()
var serverName = 'Lingo Server';

var routeCtrl  = require('./controllers/routeCtrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// gTranslate.translate('My name is Hansel', 'es', function(err, translation) {
//   console.log(translation.translatedText);
// });

app.get('/',routeCtrl.home);
app.get('/quiz',routeCtrl.home);
app.get('/progress',routeCtrl.home);



// APIs
app.get('/api/getWords',routeCtrl.getWords);
app.post('/api/createData',routeCtrl.createData);
app.post('/translating/',routeCtrl.translating);
app.post('/validateAnswer',routeCtrl.validateAnswer);



var port = 3000;
app.listen(port, function  () {
	console.log(serverName, " running on port: ", port);
});

	
