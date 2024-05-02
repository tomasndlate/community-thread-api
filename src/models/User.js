const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    required: false,
  },
  email: {
    type: String,
    unique: true
  },
  username: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;