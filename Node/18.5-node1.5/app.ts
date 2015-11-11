var express = require('express')
var bodyParser = require('body-parser')

var app = express();

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(express.static(__dirname + '/public'));

app.get('/',function(req,res){
	console.log('Query', req.query)
	res.send(req.query)
})

app.get('/about', function(req,res){
	res.send('You are in the about page')
})

var port = 3000
app.listen(port,function(){
	console.log('Server is Live on port:' + port)
})