const UserSchema = {
  required: [ '_id', 'email', 'username', 'name' ],
  type: 'object',
  properties: {
    _id: { type: 'string' },
    googleId: { type: 'string' },
    email: { type: 'string', example: 'user@gmail.com' },
    username: { type: 'string', example: 'user123' },
    password: { type: 'string' },
    name: { type: 'string', example: 'User Three' }
  }
}

module.exports = {
  UserSchema
}