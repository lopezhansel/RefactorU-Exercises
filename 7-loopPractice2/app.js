var animals =  ['rat', 'cat', 'butterfly', 'marmot', 'ocelot'];

console.log('Problem Set 1')
for (var i = 0 ; i < animals.length -1  ; i++){
	console.log("1: " + animals[i]);
}
console.log('\n')
console.log('Problem Set 2')
for (var i = 0 ; i < animals.length   ; i = i +2){
	console.log("2: " +animals[i]);
} 
console.log('\n')
console.log('Problem Set 3')
for (var i = animals.length -1; i > -1  ; i--){
	console.log("3: " +animals[i]);
} 
console.log('\n')
console.log('Problem Set 4')
for (var i = 0 ; i < animals.length-1  ; i++){
	console.log("4: "+animals[i]);

	for(var j = (i+1); j <= (i+1); j++ ){
		console.log("4: "+animals[j]);
	}
} 


