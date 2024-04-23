const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/User');
const { comparePassword } = require('../utils/passwordUtils');

passport.use(new LocalStrategy({
    // Passport expect username and passport from json
    // To change the json variables to other credentials (eg. email & code)
    usernameField: 'username', 
    passwordField: 'password',
    // Allow passing the entire request object to the callback function
    // passReqToCallback: true 
    }, async (username, password, done) => {
    try {
        const user = await User.findOne({ username });
        const isValidPassword = await comparePassword(password, user.password);

        user && isValidPassword
        ? done(null, user)
        : done(null, false, {message: 'Invalid username or password'});
        
    } catch (error) {
        done(error)
    }
}));

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}

// Extract from the bearer string
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// JWT secret to unhash value
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
        const user = await User.findById(jwt_payload.userId);

        user 
        ? done(null, user)
        : done(null, false, {message: 'Invalid token'});
         
    } catch (error) {
        done(error)
    }
}));

module.exports = passport;