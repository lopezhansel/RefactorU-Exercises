
 function firstReverse  (str) {
 	var output = []
 	for(var i = str.length-1; i >=0; i--){
 		output.push(str[i]);
 	}
 	return output.join('')
 }
 console.log(firstReverse('hello'));

 var swapCase = function(str){
     var output = []
     for (var i = 0; i < str.length; i++) {
     	if(str[i] === str[i].toLowerCase()){
     		output.push(str[i].toUpperCase())
     	}else if(str[i] === str[i].toUpperCase()){
     		output.push(str[i].toLowerCase())
     	}
     };
     return output.join('')
 }
 console.log(swapCase('Hello World 10(;/#@) rEFACTORu')) 

function mostUsedLetter  (str) {
	str = str.replace(/\s/g,''); 
	var obj = {}
	for (var i = 0; i < str.length; i++) { 
		if (obj.hasOwnProperty(str[i])){
			obj[str[i]]	++
		}else{
			obj[str[i]] = 1
		}
	};
	biggestKey = ['none',0];
	for(var key in obj){
		if (obj[key] > biggestKey[1]){
			biggestKey[0] = key
			biggestKey[1] = obj[key]
		}
	}
	return  "Most Used Letter is '" +biggestKey[0] + "' and it was used " +biggestKey[1]+ ' times'
}
console.log(mostUsedLetter('The quick brown fox jumps over the lazy dog'));

function repeatedLetters  (str) {
	str = str.replace(/\s/g,''); 
	var obj = {}
	for (var i = 0; i < str.length; i++) { 
		if (obj.hasOwnProperty(str[i])){
			obj[str[i]]	++
		}else{
			obj[str[i]] = 1
		}
	};
	return obj
}
function propertyTotal (obj) {
	var output = 0
	for (var key in obj){
		if(obj[key] > 1){
			output = output + obj[key]
		}
	}
	return output
}
function letterCount  (str) {

	var wordsArray = str.split(' ')// make into array
	
	var wordsArrayTemp = []
	wordsArray.forEach(function(element) {	// loop through wordsArray counted each repeated letter 
		var pops = repeatedLetters(element)
		wordsArrayTemp.push(propertyTotal(pops)) // pushing result to new array
	})

	var biggestNum = 0
	wordsArrayTemp.forEach(function(element){
		if (element > biggestNum){
			biggestNum = element
		}
	})

	output = []
	for (var i = 0; i < wordsArrayTemp.length; i++) {
		if (wordsArrayTemp[i] === biggestNum) {
			output.push(wordsArray[i])
		};
	};
	return output.toString()
}
console.log(letterCount('Thee foxx jumps over the lazy dog'));

