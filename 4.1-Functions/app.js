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

function startsWithA (text){
	var input = text;
	if (input.charAt(0) === "a"){
		return true;
	}else{
		return false;
	}
}