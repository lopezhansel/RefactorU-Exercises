var mongoose = require('mongoose');

var requestSchema = mongoose.Schema({

    who          : {type: mongoose.Schema.ObjectId , ref: 'user', required: true},
    email        : {type: String, required: true},
    what        : {type: String, required: true},
    phone        : {type: String, default: "555-555-5555"},
    cell         : {type: String, default: "555-555-5555"},
    lat          : {type: Number, default: 0 },
    lon          : {type: Number, default: 0 },
    timeStamp    : {type: Number, default: 0 },
});

module.exports  = mongoose.model('request', requestSchema);
