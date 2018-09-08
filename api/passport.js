const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local');
const jwtSecret = require('./config/env').jwtSecret;
const User = require('./models/user');

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: jwtSecret
}, async (payLoad, done) => {
    try {
        const user = await User.findById(payLoad.sub);
        if(!user) {
            return done(null, false);
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        console.log(email);
        const user = await User.findOne({ email });
        console.log(user);
        if(!user) {
            return done(null, false);
        }
        
        const isMatch =  user.isValidPassword(password);
        console.log(isMatch);
        if(!isMatch) {
            return done(null, false);
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
}));