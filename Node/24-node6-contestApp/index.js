var express = require('express');
var bodyParser = require('body-parser');
// console.log(bodyParser);
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));


var allSubmissions = [];

app.get('/', function(req, res){
  res.sendFile('index.html',{root:'./public/views'});
});

app.get('/submissionsApi',function  (req,res) {
	res.send(allSubmissions);
});

app.get('/BestVideos',function  (req,res) {
	res.sendFile('bestvideos.html',{root:"./public/views"});
});
app.post('/postVideos',function(req,res){
	allSubmissions.push(req.body);
	console.log(req.body);

	res.send(allSubmissions	);
});

var port = 3000;
app.listen(port, function(){
  console.log('Server running on port ' + port);
  // console.log(	'hello');

});