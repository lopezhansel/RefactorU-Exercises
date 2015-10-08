var express = require('express');
var bodyParser = require('body-parser');

var app = express();

app.get('/',function(req,res){
	app.send('hello');
});

var port = 3000;
app.listen(port,function(){
	console.log('Server Started');
});