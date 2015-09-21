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

function isOdd (str) {
	if (Number(str)%2 === 0) {
		return false
	}else{
		return true
	}
}
function dashInsert (num) {
	var str = num.toString();
	var arr = []
	for (var i = 0; i < str.length; i++) {
		arr.push(str[i])
		if (isOdd(str[i]) && isOdd(str[i+1])) {
			arr.push('-')		
		};
	};
	return arr.join('')
}
console.log(dashInsert(1234556));
