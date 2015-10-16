var express = require('express');
var bodyParser = require('body-parser');
var routeCtrl = require('./controllers/routeCtrl');

var serverName = 'Scafold';
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));


app.get('/',routeCtrl.home);

app.post('/api/createData',routeCtrl.createData);
app.get('/api/readData',routeCtrl.readData);

var port = 3000;

app.listen(port, function  () {
	console.log(serverName, " running on port: ", port);
});

