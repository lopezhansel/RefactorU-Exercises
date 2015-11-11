var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username     : {type: String, required: true, unique: true },
    password     : {type: String, required: true },
    gender       : {type: String},
    dob          : {type: Number},
    firstName    : {type: String},
    lastName     : {type: String},
    email        : {type: String},
    phone        : {type: String, default: "555-555-5555"},
    cell         : {type: String, default: "555-555-5555"},
    pictureLg    : {type: String, default: "https://tracker.moodle.org/secure/attachment/30912/f3.png"},
    pictureMd    : {type: String, default: "https://instagramimages-a.akamaihd.net/profiles/anonymousUser.jpg"},
    pictureSm    : {type: String, default: "http://www.homejobs90.com/sites/all/themes/responsive_blog/avatar-new.png"},
    lat          : {type: Number, default: 0 },
    lon          : {type: Number, default: 0 },
    timeStamp    : {type: Number, default: 0 },
});

module.exports  = mongoose.model('user', userSchema);