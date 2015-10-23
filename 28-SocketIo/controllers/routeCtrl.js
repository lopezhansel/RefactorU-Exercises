var Data = require('../models/dataDb');

module.exports = {
	readData     : readData,
	createData   : createData,
	home         : home
};
function readData (req,res) {
	Data.find({},function  (err,doc) {
			res.send(doc);
	});
}

function createData (req,res) {
	var insertData = new Data(req.body);
	insertData.save();
	res.send( insertData);
}

function home (req,res) {
	res.send('welcome Home , this is redundant');
}
