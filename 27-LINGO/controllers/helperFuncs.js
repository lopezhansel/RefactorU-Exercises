module.exports = {
	typoCheck: typoCheck,
	longerOrShorter: longerOrShorter,
	removeExtraLetters: removeExtraLetters,
	missingOneLetter: missingOneLetter
};


// checks if same lengthed words have typo
function typoCheck(guess, correctAnswer) {
	if (guess.length === correctAnswer.length) {
		var count = 0;
		guess.split('').map(function(element, index) {
			if (element === correctAnswer.split('')[index]) {
				count++;
			}
		});
		return count >= guess.length - 1;
	} else {
		return false;
	}
}

// checks if character extra or character short  was included included the guess
function longerOrShorter(guess, correctAnswer) {
	if ((guess.length === correctAnswer.length - 1) || (guess.length === correctAnswer.length + 1)) {
		if (guess.length < correctAnswer.length) {
			return missingOneLetter(guess, correctAnswer);
		} else {
			return removeExtraLetters(guess, correctAnswer);
		}
	} else {
		return false;
	}
}

// this functions takes to similar words and makes them the same length
function removeExtraLetters(guessAnswer, correctAnswer) {
	var outputArray = [];
	count = 0;
	guessAnswer.split('').map(function(element) {
		if (element === correctAnswer.split('')[count]) {
			outputArray.push(element);
			count++;
		}
	});
	var count2 = 0;
	outputArray.map(function(element, index) {
		if (element === correctAnswer[index]) {
			count2++;
		}
	});
	return count2 >= correctAnswer.length - 1;
}


function missingOneLetter(guessAnswer, correctAnswer) {
	var outputArray = [];
	count = 0;
	guessAnswer.split('').map(function(element, index) {
		if (element === correctAnswer.split('')[count]) {
			outputArray.push(element);
			count++;
		} else {
			outputArray.push("-" + element);
			count = count + 2;
		}
	});
	var count2 = 0;
	outputArray.map(function(element, index) {
		if (element === correctAnswer[index]) {
			count2++;
		}
	});
	return count2 >= correctAnswer.length - 1;
}