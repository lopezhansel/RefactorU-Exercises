function letterCapitalize (str) {
	var strArray = str.split(' ');

	for (var i = 0 ; i < strArray.length; i++){
		var capitalWord = strArray[i].charAt(0).toUpperCase() + strArray[i].slice(1);
		strArray[i] = capitalWord;
	}

	return strArray.join(' ');
}

console.log(letterCapitalize('hello there im here'))

