var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();
var serverName = 'Lingo Server';
var routeCtrl  = require('./controllers/routeCtrl');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));




app.get('/',routeCtrl.home);
app.get('/api/readData',routeCtrl.readData);
app.post('/api/createData',routeCtrl.createData);


var port = 3000;
app.listen(port, function  () {
	console.log(serverName, " running on port: ", port);
});

	
