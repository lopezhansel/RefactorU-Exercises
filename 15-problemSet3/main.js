function palindrome (str) {
	var backwards = []
	for (var i = str.length-1; i >= 0; i--) {
		backwards.push(str[i])
	};
	if (str === backwards.join('')){
		return true;
	}
	else {
		return false
	}
}
console.log(palindrome('hello'));
console.log(palindrome('racecar'));

