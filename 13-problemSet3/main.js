
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

function popularLetter  (str) {
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
console.log(popularLetter('The quick brown fox jumps over the lazy dog'));

function popularLetters  (str) {
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
function countKeyValueTotal (obj) {
	var output = 0
	for (var key in obj){
		if(obj[key] > 1){
			output = output + obj[key]
		}
	}
	return output
}
function letterCount  (str) {
	var arr = str.split(' ')
	var output = []
	arr.forEach(function(element) {
		var pops = popularLetters(element)
		output.push(countKeyValueTotal(pops))
	})
	var biggestNum = 0
	output.forEach(function(element){
		if (element > biggestNum){
			biggestNum = element
		}
	})
	output2 = []
	for (var i = 0; i < output.length; i++) {
		if (output[i] === biggestNum) {
			output2.push(arr[i])
		};
	};
	return output2.toString()
}
console.log(letterCount('Thee quiuaicck bbbbbrown fox jumps over the lazy dog'));

