// user ctrl
var phoneSchema  = require('./models/phoneDb');
module.exports = {
	findPhones     : findPhones,
	createPhones   : createPhones
};
// function hoisting yeah!
function findPhones (req,res) {
	res.send('finding Phones');
}

function createPhones (req,res) {
	res.send('create Phones');
}