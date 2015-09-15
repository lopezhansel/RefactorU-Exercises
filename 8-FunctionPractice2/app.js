// =====================FUNCTION  ========================================
function getName (arg) {
	return arg.name
}
console.log("Function 1")
console.log(getName({ name: 'Luisa', age: 25  })+ '\n')

// =====================FUNCTION 2 ========================================
function totalLetters (arg) {
	return arg.join('').length
}
console.log("Function 2")
console.log(totalLetters(['javascript', 'is', 'awesome']))
console.log(totalLetters(['what', 'happened', 'to', 'my', 'function']) + '\n')
// =====================FUNCTION  3=======================================
function keyValue (arg1 , arg2) {
	// this didnt work I'm not sure why
	var obj = {
		arg1 : arg2
	} 
	return obj  // arg 1 has to be a literal string
	// var obj = {};
	// obj[arg1]= arg2;
	// return obj
}
console.log("Function 3")
console.log(keyValue('city', 'Denver'))
// =====================FUNCTION  4========================================

function negativeIndex (array, num) {
	return array[array.length+num]
}
console.log('Function 4')
console.log(negativeIndex(['a', 'b', 'c', 'd', 'e'], -2))
console.log(negativeIndex(['jerry', 'sarah', 'sally'], -1) + '\n')
// =====================FUNCTION  5========================================
// this function didnt work
// 	var num = 0
// function removeM (str) {

// 	for(var i = 0; i < str.length; i++){
// 		console.log(str[i]);
// 		var  num = (str[i] == 'a') ? num += 1 : console.log('h')
// 	    console.log( num );
// 	    // console.log( str[i] );
// 	}

// }
// removeM('abcdbef')
// =====================FUNCTION  6 PRINT OBJECT ========================================

function printObject (obj) {
	for (prop in obj){
		console.log(prop + " is " + obj[prop]);
	}
}
console.log('Function 6 Print OBJECT')
printObject({ a: 10, b: 20, c: 30 }) 
printObject({ firstName: 'pork', lastName: 'chops' })
console.log('\n')
// =====================FUNCTION  7 VOWELS ========================================

var arr = []
function vowels (str) {
	
	for(var i = 0; i < str.length; i++){
		if (str[i] === 'a') {
			arr.push(str[i])
		}
	}
	console.log(arr);
}
vowels('adfasdfad')


// =====================FUNCTION  8 TWINS ========================================

	
// =====================FUNCTION  9 OR ========================================


// =====================FUNCTION   10 UNIQUE ========================================

