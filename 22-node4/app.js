var express = require('express')
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.sendFile('seville.html', { root: './public'})	
})

app.get('/:location', function(req, res) {
	// res.sendFile('canary.html', { root: './public'})	
	console.log(req.params.location);
	res.sendFile(req.params.location + ".html", { root: './public'})	
})

// app.get('/capeVerde', function(req, res) {
// 	res.sendFile('capeVerde.html', { root: './public'})	
// })

// app.get('/guam', function(req, res) {
// 	res.sendFile('guam.html', { root: './public'})	
// })

// app.get('/megallan', function(req, res) {
// 	res.sendFile('megallan.html', { root: './public'})	
// })

// app.get('/philippines', function(req, res) {
// 	res.sendFile('philippines.html', { root: './public'})	
// })

var port = 3000
app.listen(port,function(){
	console.log('started server ')
})