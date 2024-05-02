const passport = require('passport');
const LocalStrategy = require('passport-local');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/User');
const { comparePassword } = require('../utils/passwordUtils');
const AuthenticationError = require('../errors/AuthenticationError');
const ServerError = require('../errors/ServerError');

passport.use(new LocalStrategy({
    // Passport expect username and passport from json
    // To change the json variables to other credentials (eg. email & code)
    usernameField: 'email', 
    passwordField: 'password',
    }, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });
        if(!user)
            throw new AuthenticationError('Invalid username or password');
        
        const isValidPassword = await comparePassword(password, user.password);
        
        if(!isValidPassword)
            throw new AuthenticationError('Invalid username or password');
        
            done(null, user)
        
    } catch (error) {
        console.log(error.statusCode)
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        done(error, false);
    }
}));

passport.use(new GoogleStrategy({
    // code executed in /auth/google
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_KEY,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  },
  // code executed in /auth/google/callback
  async (accessToken, refreshToken, profile, done) => {
    try {
        // Check if the user is already authenticated via Google OAuth2
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser)
            return done(null, existingUser);

        // Is normal user
        const normalUser = await User.findOne({ email: profile.email });
        if (normalUser) {
            normalUser.googleId = profile.id;
            await normalUser.save();
            return done(null, normalUser);
        }

        // New Google authenticated user
        const newUser = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.email,
        });
        await newUser.save();
        return done(null, newUser);

    } catch (error) {
        error = !error.statusCode ? new ServerError('Internal error.') : error;
        done(error, false);
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