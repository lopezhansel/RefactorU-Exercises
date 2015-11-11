// phoneCtrl.js
// Create read Update Delete 
var Phone  = require('../models/phoneDb');
module.exports = {
	readPhones     : readPhones,
	createPhones   : createPhones,
	login          : login
};
// function hoisting yeah!
function readPhones (req,res) {
	Phone.find({},function  (err, phone) {

		res.send(phone);
	});
}

function createPhones (req,res) {
	console.log('phone received', req.body.name);
	var newPhone = new Phone(req.body);
	newPhone.save();
	res.send('create Phones');
}

function login (req,res) {
	console.log('Session : ', req.session);
	res.send(req.session);
}