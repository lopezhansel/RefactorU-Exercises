var mongoose = require('mongoose');


var wordSchema = mongoose.Schema({
	word            :  String,
});


module.exports= mongoose.model('Word',wordSchema);

var quizSchema = mongoose.Schema({
	words : Array,
	language: String,
	pass: Boolean,
	numRight: Number,
	numWrong: Number,
	timeStamp: Number

});

var Useer = mongoose.Schema({
	name        : String,
	password    : String,
	quizes      : Array,
	WordsTested : Array,
	TestLangs   : Array,


});


var WordsTested  = {
	word : "dog",
	lang : "es",
	guess: "pero",
	answer: "perro"
};