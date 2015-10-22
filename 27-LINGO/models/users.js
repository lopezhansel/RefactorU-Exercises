var mongoose = require('mongoose');

console.log("userSchema");
var userSchema = mongoose.Schema({
	name            : String,
	wordsParactice  : Number,
	timesWrong      : Number,
	timesCorrect    : Number,
	percentage      : Number,
	timestamp       : Number
});


module.exports= mongoose.model('User',userSchema);

