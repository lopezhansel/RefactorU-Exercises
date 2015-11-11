var numVictims = prompt ("how many victims do you wish to enter")
var victimsNames = []
var victimsStreets = []
var victimsPhones = []

for (var i = 0; i < numVictims; i++) {
	var name   = prompt('victim ' + (i+1) + ' name' )
	var street = prompt('victim ' + (i+1) + ' street' )
	var phone  = prompt('victim ' + (i+1) + ' phone' )
	victimsNames.push(name)
	victimsPhones.push(phone)
	victimsStreets.push(street)
};

console.log(victimsNames)
console.log(victimsStreets)
console.log(victimsPhones)
