var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var serverName = 'Lingo Server';

var routeCtrl  = require('./controllers/routeCtrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

// gTranslate.translate('My name is Hansel', 'es', function(err, translation) {
//   console.log(translation.translatedText);
// });

// app.get('/',routeCtrl.home);
app.get('/quiz',routeCtrl.sendQuiz);
app.get('/progress',routeCtrl.progress);



// APIs
app.get('/api/readData',routeCtrl.readData);
app.post('/api/createData',routeCtrl.createData);
app.post('/translating/',routeCtrl.translating);



var port = 3000;
app.listen(port, function  () {
	console.log(serverName, " running on port: ", port);
});

	
