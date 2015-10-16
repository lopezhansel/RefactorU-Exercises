var Data = require('../models/dataDb');

function readData (req,res) {
		Phone.find({},function  (err,doc) {
				res.send(doc);
	res.send('welcome Home , this is redundant');
		});
}

function createData (req,res) {
	var insertData = new Data(req.body);
	insertData.save();
	res.send('here the new Data You created', insertData);
	res.send('welcome Home , this is redundant');
}

function home (req,res) {
	res.send('welcome Home , this is redundant');
}

module.exports = {
	readData     : readData,
	createData   : createData,
	home         : home
};