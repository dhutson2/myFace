const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  name: String,
  image: String,
  about: String,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
