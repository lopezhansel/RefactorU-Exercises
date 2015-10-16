var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/dataDb');

var dataSchema = mongoose.Schema({
	data1 : {type : String},
	data2 : {type : String},
	data3 : {type : String}
});


module.exports= mongoose.model('Data',dataSchema);

