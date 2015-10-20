var Word = require('../models/dataDb');
var User = require('../models/users');
var api = require('myApis/api');
var gTranslate = require('google-translate')(api);
var helperFuncs = require('./helperFuncs');


module.exports = {
	getTenRandWords   : getTenRandWords,
	createData        : createData,
	home              : home,
	translating       : translating,
	validateAnswer    : validateAnswer

};

function getTenRandWords(req, res) {
	Word.find({}, function(err, docs) {
		var tenRandWords = [];
		res.send(docs[Math.floor(Math.random()*docs.length)].word);
		for (var i = 0; i < 10; i++) {
			tenRandWords.push(docs[Math.floor(Math.random()*docs.length)]);
		}
		// console.log(docs[Math.floor(Math.random()*docs.length)]);
	});
	// console.log(req);
}

function createData(req, res) {
	var newWord = new Word({
		word            : "baby",
		timesPracticed  : 0,
		timesWrong      : 0,
		timesCorrect    : 0,
		percentage      : 0,
		timestamp       : 0
	});

	newWord.save();
	console.log(newWord);
	res.send(newWord);
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
function validateAnswer (req,res) {
	gTranslate.translate(req.body.quiz,'es',function  (err,translation) {
		req.body.answer = translation.translatedText.toLowerCase();
		req.body.guess = req.body.guess.toLowerCase();

		req.body.correct = isCorrect(req.body.guess, req.body.answer);

		// console.log(req.body);
		res.send(req.body);
	});
}

function isCorrect (guess,answer) {
	if (guess===answer) {
		return true;
	}else{
		return helperFuncs.typoCheck(guess,answer) || helperFuncs.longerOrShorter(guess,answer) ;
	}
}


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
// testLang('en', 'es', 'hala', 'hello');socket.setKeepAlive([enable], [initialDelay]);
// ......................................

// 	var newUser = new User({
// 		name            : "rocko",
// 		wordsParactice  : 3,
// 		timesWrong      : 3,
// 		timesCorrect    : 3,
// 		percentage      : 3,
// 		timestamp       : 3
// 	});
// 	console.log(newUser);
// 	newUser.save();
// console.log('hello');


