function getName (arg) {
	return arg.name
}
console.log("Function 1")
console.log(getName({ name: 'Luisa', age: 25 }))
function totalLetters (arg) {
	return arg.join('').length
}
console.log("Function 2")
console.log(totalLetters(['javascript', 'is', 'awesome']))
console.log(totalLetters(['what', 'happened', 'to', 'my', 'function']))
