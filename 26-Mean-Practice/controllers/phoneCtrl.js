// phoneCtrl.js
// Create read Update Delete 
var phoneSchema  = require('../models/phoneDb');
module.exports = {
	readPhones     : readPhones,
	createPhones   : createPhones
};
// function hoisting yeah!
function readPhones (req,res) {
	res.send();
	console.log('finding phones');
}

function createPhones (req,res) {
	console.log('phone received', req.body);
	res.send('create Phones');
}