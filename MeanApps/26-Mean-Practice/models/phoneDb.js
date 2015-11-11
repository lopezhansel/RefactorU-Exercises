// phoneDb.js
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/phoneDb');


var phoneSchema = mongoose.Schema({
	name         : {type: String},
	manufacturer : {type: String},
	cost         : {type: Number},
	rating       : {type: Number}
});

module.exports = mongoose.model('Phone',phoneSchema);