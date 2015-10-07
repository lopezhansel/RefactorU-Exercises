var express = require('express');
var fs = require('fs');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	// var fileContents = fs.readFileSync('data.txt');
	fs.readFile('data.txt',function(err,data){
		// var fileContents = data
		res.header('Content-Type', 'text/html');
		res.send(data);
	});
	// console.log(fileContents );
  // res.render('index', { title: 'Hansels site', nums: [1,2,3,4,5] });
});

module.exports = router;
