var Data = require('../models/dataDb');

module.exports = {
	readData     : readData,
	createData   : createData,
	home         : home
};

function readData (req,res) {
	Data.find({},function  (err,docs) {
		res.send(docs);
	});
}

function createData (req,res) {
	var insertData = new Data(req.body);
	console.log(insertData);
	insertData.save();
	res.send( insertData);
}

function home (req,res) {
	console.log('at home');
	res.send('welcome Home , this is redundant');
}
