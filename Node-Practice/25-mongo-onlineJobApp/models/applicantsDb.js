// var Cat = mongoose.model('Cat', { name: String });
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/omega3');

var ApplicantsConstructor  = mongoose.model('applicant',{
	name   : {type : String},
	bio    : {type : String},
	skills : {type : String},
	years  : {type : String},
	why    : {type : String}
});

module.exports = {
	ApplicantsConstructor : ApplicantsConstructor
};

