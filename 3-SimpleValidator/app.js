// has flaw spaces and perios can will pass
function askNumber (){
	var userNumber = prompt("Write Your Nummber including dashes");
	alert(validateNumber(userNumber));
}

function validateNumber (userInput){

	if (userInput.length !== 12){
		return 'Please Write a Full Phone Number';
	}else if (userInput.charAt(3) !== "-" || userInput.charAt(7) !== "-"){
		return"Please input dashes";
	}else if (!(Number.isInteger(Number(userInput.substring(0,3))) && 
		Number.isInteger(Number(userInput.substring(4,7))) && 
		Number.isInteger(Number(userInput.substring(8,12))))){
		return "Please input Digits!";
	}else{
		return'Woo! You Wrote A real Phone Number!';
	}
}
