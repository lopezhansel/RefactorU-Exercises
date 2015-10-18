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
// gTranslate.translate('My name is Hansel', 'es', function(err, translation) {
//   console.log(translation.translatedText);
// });

var wordsAray = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];
// var count = 0;


// checks if same lengthed words have typo
function typoCheckPt1(guess, correctAnswer) {
	if (guess.length === correctAnswer.length) {
		var count = 0;
		guess.split('').map(function(el, i) {
			if (el === correctAnswer.split('')[i]) {count++; }
		});
		return count >= guess.length - 1;
	} 
	else {return false; }
}
// console.log("tyepoCheckOne", typoCheckPt1('hella','hello'));

// checks if character extra or character short  was included in the guess
function longerOrShorter (guess, correctAnswer) {
	if (guess.length === correctAnswer.length-1 || guess.length === correctAnswer.length+1 ){
		if (guess.length <correctAnswer){console.log('guess is shorter than correctAnswer');
		}else{console.log('guess is longer than correctAnswer'); }
		return true;
	}else {return false; }
}



// console.log(longerOrShorter('hello', 'hell'));
// this function takes to similar words and makes them the same length
function removeExtraLetters (guessAnswer, correctAnswer) {
	var outputArray = [];
	count = 0;
	guessAnswer.split('').map(function  (element) {
		if (element === correctAnswer.split('')[count]){ 
			outputArray.push(element);
			count++;
		}
	});
	return outputArray.join("");
}
// console.log(removeExtraLetters('jaaavvascript', "javascript"));

function missingOneLetter (guessAnswer,correctAnswer) {
	var outputArray = [];
	count = 0;
	guessAnswer.split('').map(function  (element,index) {
		if (element=== correctAnswer.split('')[count]) {
			outputArray.push(element);
			count++;
		}
		else{
			outputArray.push("-"+element);
			count= count + 2;
		}
	});
	return outputArray.join('');
}

console.log(missingOneLetter('javacript','javascript'));

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
// testLang('en', 'es', 'hala', 'hello');socket.setKeepAlive([enable], [initialDelay])