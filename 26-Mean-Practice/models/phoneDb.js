// phoneDb.js
var mongoose = require('mongoose');

var phoneSchema = mongoose.Schema({
	name         : {type: String},
	manufacturer : {type: String},
	cost         : {type: Number},
	rating       : {type: Number}
});

module.exports = { phoneSchema: phoneSchema};