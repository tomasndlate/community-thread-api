const mongoose = require('mongoose');
const { SCHEMA } = require('../openapi/openapi-builder');

SCHEMA(
  'User', 
  {
    required: ["_id", "email", "username", "name"],
    type: "object",
    properties: {
        _id: { type: "string" },
        googleId: { type: "string" },
        email: { type: "string", example: "user@gmail.com" },
        username: { type: "string", example: "user123" },
        password: { type: "string" },
        name: { type: "string", example: "User Three" },
    }
  }
)
const userSchema = new mongoose.Schema({
  googleId: {
    type: String,
    unique: true,
    sparse: true
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