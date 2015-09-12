function getName (arg) {
	return arg.name
}
console.log("Function 1")
console.log(getName({ name: 'Luisa', age: 25 }))
console.log('\n')
function totalLetters (arg) {
	return arg.join('').length
}
console.log("Function 2")
console.log(totalLetters(['javascript', 'is', 'awesome']))
console.log(totalLetters(['what', 'happened', 'to', 'my', 'function']))
console.log('\n')

function keyValue (arg1 , arg2) {
	// this didnt work I'm not sure why
	// var obj = {
	// 	arg1 = arg2;
	// }
	var obj = {};
	obj[arg1]= arg2;
	return obj
}
console.log("Function 3")
console.log(keyValue('city', 'Denver'))
console.log('\n')

function negativeIndex (array, num) {
	return array[array.length+num]
}
console.log('4th Function')
console.log(negativeIndex(['a', 'b', 'c', 'd', 'e'], -2))
console.log(negativeIndex(['jerry', 'sarah', 'sally'], -1) )
console.log('\n')

