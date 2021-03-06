var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');

var app = express();

var locations = ["Seville", "Canary Islands", "Cape Verde", "Strait of Magellan", "Guam", "Philippines"];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
	res.sendFile('seville.html', {
		root: './public'
	});
});

app.get('/next', function(req, res) {
	locations.forEach(function(item, index) {
		if (item.toLowerCase() === req.query.location.toLowerCase()) {
			req.query.nextLocation = locations[index + 1];
		}
	});
	res.send(req.query);
});

app.get('/:location', function(req, res, next) {
	res.sendFile(req.params.location + ".html", {
			root: './public'
		},
		function(err) {
			if (err) {
				res.redirect('guam.html');
			}
		});
});



// Using top because it handles errors
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
// using top because its dynamic
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
app.listen(port, function() {
	console.log('started server ')
})