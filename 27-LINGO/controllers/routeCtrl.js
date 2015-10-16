var Data = require('../models/dataDb');
var api = require('myApis/api');
var gTranslate  = require('google-translate')(api);

module.exports = {
	readData     : readData,
	createData   : createData,
	home         : home,
	translating  : translating

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
	// console.log(req);
	var path = req._parsedOriginalUrl.path;
	res.sendFile('/views' +path+ ".html",{root:"./public"});
}


function translating (req,res) {
	console.log(req.body);

	gTranslate.translate(req.body.sourceText,req.body.newLang,function  (err, translation) {
		console.log(translation.translatedText);
		if (err){res.send(err); }
		else{res.send(translation.translatedText); }
	});

}