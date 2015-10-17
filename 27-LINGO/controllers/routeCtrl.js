var Data = require('../models/dataDb');
var api = require('myApis/api');
var gTranslate = require('google-translate')(api);

module.exports = {
	readData: readData,
	createData: createData,
	home: home,
	translating: translating

};

function readData(req, res) {
	Data.find({}, function(err, docs) {
		res.send(docs);
	});
}

function createData(req, res) {
	var insertData = new Data(req.body);
	console.log(insertData);
	insertData.save();
	res.send(insertData);
}

function home(req, res) {
	// console.log(req);
	var path = req._parsedOriginalUrl.path;
	res.sendFile('/views' + path + ".html", {
		root: "./public"
	});
}


function translating(req, res) {
	console.log(req.body);

	gTranslate.translate(req.body.sourceText, req.body.newLang, function(err, translation) {
		console.log(translation.translatedText);
		if (err) {
			res.send(err);
		} else {
			res.send(translation.translatedText);
		}
	});

}
var wordsAray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
// var count = 0;


// gTranslate.translate('My name is Hansel', 'es', function(err, translation) {
//   console.log(translation.translatedText);
// });

function typoCheck(guess, right) {

	if (guess.length === right.length) {
		var count = 0;
		guess.split('').map(function(el, i) {
			if (el === right.split('')[i]) {count++ }
		});
		return count > guess.length-2;
	}
}
console.log(typoCheck('hello', 'hello'));

// function testLang(srcLang, destLang, guess, quizWord) { // this is to see if the guess matches exactly to translation
// 	var rightOrWrong = null;
// 	gTranslate.translate(quizWord, destLang, function(err, translation) {
// 		if (guess.toLowerCase() === translation.translatedText.toLowerCase()) {
// 			rightOrWrong = "right";
// 			return console.log(rightOrWrong);
// 		} else {
// 			console.log(typoCheck(guess, translation.translatedText));
// 		}
// 	});
// 	// return rightOrWrong;
// }
// testLang('en', 'es', 'hala', 'hello');