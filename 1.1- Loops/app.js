//1: increment to 500 by 100s
console.log("1: increment to 500 by 100s");
for (var i = 0; i < 501; i+=100){
	console.log(i); 
}
//2: multiply by two to 64
console.log("2: multiply by twos till 64");
for (var i = 1; i < 65; i= i*2){
	console.log(i); 
}
//3: This should be a for loop inside  a for loop

console.log("3: divide by 3??");
for (var i = 0; i < 9; i+=1){
	if (i<3){
		console.log(1); 
	}
	 else if(i<6){
		console.log(2);
	}
	else{
		console.log(3);
	}
}
