function tripleFive () {
		for(var i = 0; i <3; i++){
		console.log("Five !");
	}
}

function lastLetter(str){
	return (str.charAt(str.length - 1));
};

function square (int){
	return int * int;
}

function negate (int){
	return 0 - int;
}

function toArray (a,b,c) {
	var newArray = [];
	newArray.push(a,b,c);
	return newArray;
}

function startsWithA (text){
	var input = text;
	if (input.charAt(0) === "a"){
		return true;
	}else{
		return false;
	}
}

function excite(input){
	return input + "!!!";
}



function sun (str) {
	if (str.indexOf('sun') > -1) {
		return true;
	}else{
		return false;
	}
}


function tiny (num){
	if(num >0 && num < 1) {
		return true;
	}else{
		return false;
	}
}

function getSeconds(str){
	var splits = str.split(":");
	return (Number(splits[0])*60) + Number(splits[1]);
}