// =====================FUNCTION  ========================================
function getName (arg) {
	return arg.name
}
console.log("Function 1 getName()")
console.log(getName({ name: 'Luisa', age: 25  })+ '\n')

// =====================FUNCTION 2 ========================================
function totalLetters (arg) {
	return arg.join('').length
}
console.log("Function 2 totalLetters()")
console.log(totalLetters(['javascript', 'is', 'awesome']))
console.log(totalLetters(['what', 'happened', 'to', 'my', 'function']) + '\n')
// =====================FUNCTION  3=======================================
function keyValue (arg1 , arg2) {
	// this didnt work I'm not sure why
	// var obj = {
	// 	arg1 : arg2
	// } 
	// return obj  // arg 1 has to be a literal string
	var obj = {};
	obj[arg1]= arg2;
	return obj
}
console.log("Function 3 keyValue()")
console.log(keyValue('city', 'Denver') + '\n')
// =====================FUNCTION  4========================================

function negativeIndex (array, num) {
	return array[array.length+num]
}
console.log('Function 4 negativeIndex')
console.log(negativeIndex(['a', 'b', 'c', 'd', 'e'], -2))
console.log(negativeIndex(['jerry', 'sarah', 'sally'], -1) + '\n')
// =====================FUNCTION  5========================================

function removeM (str) {
	var array = []
	for(var i = 0; i < str.length; i++){
		if(str.charAt(i).toLowerCase() !== 'm'){
			array.push(str.charAt(i))
		}
	}
	return array.join('')
}
console.log('Function 5 removeM()')
console.log(removeM('abcdbemadamadfmf') +'\n')

// =====================FUNCTION  6 PRINT OBJECT ========================================

function printObject (obj) {
	for (prop in obj){
		console.log(prop + " is " + obj[prop]);
	}
}
console.log('Function 6 printObject()')
printObject({ a: 10, b: 20, c: 30 }) 
printObject({ firstName: 'pork', lastName: 'chops' })
console.log('\n')
// =====================FUNCTION  7 VOWELS ========================================

// var arr = []
// function vowels (str) {
	
// 	for(var i = 0; i < str.length; i++){
// 		if (str[i] === 'a') {
// 			arr.push(str[i])
// 		}
// 	}
// 	console.log(arr);
// }
// vowels('adfasdfad')


// =====================FUNCTION  8 TWINS ========================================
// function twins (arr) {

// 	for (var i = 0; i < arr.length; i++) {
// 		i 
// 		var j = i+1
// 		if (arr[i]===arr[j]) {
// 			return false
// 		};
// 	};
// }
// console.log(twins(['a', 'a', 'b', 'c', 'd', 'd']));	
// console.log(twins(['a', 'a', 'c', 'c', 'd', 'd']));	
// =====================FUNCTION  9 OR ========================================
// function or (arr) {
// 	if (arr.length < 0) {
// 		return false;
// 	};
// 	for (var i = 0; i < arr.length; i++) {

// 		};
// }


// =====================FUNCTION   10 UNIQUE ========================================
// console.log('\n');
// console.log('Function 10 ');

// var unique = function  (arr) {

// 	for (var i = 0; i < arr.length; i++) {
		
// 		var first = arr[i]

// 		for (var j = i+1; j < arr.length; j++) {
// 			// console.log(i + ':'+ arr[i] ); // dont include this
// 			console.log('before ' + j + ': '+ arr[j] );
			
// 			if (arr[j] === first) {
// 				 arr.splice(j,1)
// 			};
// 			console.log('after splice' + j + ': '+ arr[j] );
// 		};
// 	};
// 	return arr
// }
// // console.log(unique(['a', 'b', 'a', 'c', 'd', 'd']) ); // dont include this
// console.log(unique(['todd', 'avery', 'maria', 'avery','avery']));


