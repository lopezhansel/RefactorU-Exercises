var mongoose = require('mongoose');

var phoneSchema = mongoose.Schema({
	name         : {type: String},
	manufacture  : {type: String},
	cost         : {type: String},
	rating       : {type: String},
	description  : {type: String},
	releaseDate : {type: String}
});
module.exports = { phoneSchema: phoneSchema};