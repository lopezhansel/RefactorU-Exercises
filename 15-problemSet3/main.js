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
// console.log(palindrome('hello'));
// console.log(palindrome('racecar'));

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
// console.log(dashInsert(1234556));

var lowerCase = []
	upperCase =  []
for (var i = 97; i < 123; i++) {
	lowerCase.push(String.fromCharCode(i))
};
for (var i = 65; i < 91; i++) {
	upperCase.push(String.fromCharCode(i))
};


// function caesarCipherSingle (str,num) { // breaks at y and z and also any other sign character
// 	var output = []
// 	for (var i = 0; i < str.length; i++) {
// 		var charCode = str.charCodeAt(i);
// 		output.push(String.fromCharCode(charCode + num) )
// 	};
// 	return output.join('')
// }
function caesarCipherSingle (str,num) {
	var output = []
	for (var i = 0; i < str.length; i++) {
		var shiftLower = lowerCase.indexOf(str[i]);
		var shiftUpper = upperCase.indexOf(str[i]);
		if (shiftLower > 0) {
			output.push(lowerCase[(shiftLower + num)%26] )
		}else if (shiftUpper > 0) {
			output.push(upperCase[(shiftUpper + num)%26] )
		}else{
			output.push(str[i])
		}

	};

	return output.join('')
}

function caesarCipher (str,num) {
	var arr = str.split(' ')
	var output = arr.map(function  (element) {
		return caesarCipherSingle(element, num)
	})
	return output.join(' ')
}
console.log(caesarCipher('HadouKen' , 27));
console.log(caesarCipher('Caesar Cipher' , 2));
console.log(caesarCipher('Caesar .42*& Cipher' , 2));
