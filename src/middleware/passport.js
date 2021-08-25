const userModel = require("../models/userModel");
const secretKey = process.env.SECRET_KEY;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secretKey
};

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        userModel.findOne({ _id: jwt_payload._id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));
}