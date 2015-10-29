var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username     : {type: String, required: true, unique: true },
    password     : {type: String, required: true },
    gender       : String,
    dob          : Number,
    firstName    : String,
    lastName     : String,
    email        : String,
    phone        : String,
    cell         : String,
    pictureLg    : String,
    pictureMd    : String,
    pictureSm    : String,
    lat          : Number,
    lon          : Number,
});

module.exports  = mongoose.model('user', userSchema);