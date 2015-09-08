// Phone Number Validator
//  BUG:  spaces, - negatives numbers and perios can will pass
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

// Birthdate Validator
// BUG: Periods will pass by
function validBirthDate (input) {
	var date = input.trim();
	var month = Number(date.substring(0,2));
	var day = Number(date.substring(3,5));
	var year = Number(date.substring(6,8));
	var error = "Please input a proper Date Format";

	// for (var i = 0; i < date.length ; i++) {	
	// }

	if (date.length != 8 ) {                                       // checking Format XX/XX/XX.length 
		return "Not 8 Characters " + error;
	}else if (date.charAt(2) !== "/" || date.charAt(5) !== "/") {  // checking for slashes
		return "Need slashes. " + error; 
	}else if(month >12 || month < 1){                      // checking valid month 1-12
		return  "not valid Month";
	}else if (day > 31 || day < 1){                      // checks valid day 1-31
		return " not valid Day";
	}else{
		return "pass";
	}
}
console.log(validBirthDate("1./01/44"));
