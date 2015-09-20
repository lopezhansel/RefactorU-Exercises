
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
     	}else{
     		// output.push(str[i])
     	}
     };
     return output.join('')
 }
 console.log(swapCase('Hello World 10(;/#@) rEFACTORu')) 
