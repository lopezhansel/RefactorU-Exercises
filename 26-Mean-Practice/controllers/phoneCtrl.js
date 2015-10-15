// phoneCtrl.js
// Create read Update Delete 
var Phone  = require('../models/phoneDb');
module.exports = {
	readPhones     : readPhones,
	createPhones   : createPhones
};
// function hoisting yeah!
function readPhones (req,res) {
	Phone.find({},function  (err, phone) {
		console.log(phone);
		console.log(err);
		res.send(phone);
	});
	

	console.log('finding phones');
}

function createPhones (req,res) {
	console.log('phone received', req.body);
	var newPhone = new Phone(req.body);
	newPhone.save();
	res.send('create Phones');
}