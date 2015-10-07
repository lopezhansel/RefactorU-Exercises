var express = require('express')
var bodyParser = require('body-parser')
var fs = require('fs')

var app = express()


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.get('/', function(req, res) {
	res.sendFile('seville.html', { root: './public'})	
})

// app.get('/:location', function(req, res) {
// 	// res.sendFile('canary.html', { root: './public'})	
// 	console.log(req.params.location);
// 	// res.sendFile(req.params.location + ".html", { root: './public'})

// 	fs.readFile("./public/"+req.params.location + ".html",function(err,data){
// 		// console.log(req.params.location);
// 		// console.log(data);

// 		if(err){
// 			res.send("Not valid destination")
// 		}else{
// 			res.header('Content-Type', 'text/html');
// 			res.send(data)
// 		}
// 	})

// })
app.get('/:location', function(req, res,next) {
	// console.log(next);
	res.sendFile(req.params.location + ".html", { root: './public'},
		function(err){
		if(err){
			res.redirect('guam.html')
			
		}
	})
	
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