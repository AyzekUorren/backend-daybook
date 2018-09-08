const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
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