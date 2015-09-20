
 function firstReverse  (str) {
 	var output = []
 	for(var i = str.length-1; i >=0; i--){
 		output.push(str[i]);
 	}
 	return output.join('')
 }
 console.log(firstReverse('hello'));
 var swapCase = function(string){
     var str2 =string.toUpperCase()
     var arr = str2.split(" ")// ['HELLO', 'WORLD']
     var arr2 = []
     for(var i = 0; i < arr.length; i++){
    	arr2.push(arr[i].replace(arr[i].charAt(0), arr[i].charAt(0).toLowerCase() ))
     }
     return arr2.join(' ')
 }
 console.log(swapCase('hello world')) 
