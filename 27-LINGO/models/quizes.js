// .................................................

var mongoose = require('mongoose');

var usersSchema = mongoose.Schema({
  name: String
});

mongoose.model('users', usersSchema);

// .................................................
var mongoose = require('mongoose');

var postsSchema = mongoose.Schema({
  content: String,
  user: {
    type: Schema.ObjectId,
    ref: 'users'
  }
});

mongoose.model('posts', postsSchema);
// ...................................

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename);
});
// .....................................



app.get('/posts/:userId', function(req, res) {
  mongoose.model('posts').find({user: req.params.userId}, function(err, posts) {
    mongoose.model('posts').populate(posts, {path: 'user'}, function(err, posts) {
      res.send(posts);
    });
  });
});