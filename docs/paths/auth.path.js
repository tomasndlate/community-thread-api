const { postSignUpMethod } = require("./auth/signup.method")

const authPath = {
    '/auth/signup': {
        post: postSignUpMethod
    }
}

module.exports = {
    authPath
}