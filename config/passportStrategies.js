const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const User = require("../models/User");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET,
}

exports.jwtStrategy = new JwtStrategy(options, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);

        if(user === null) {
            throw "User not found"
        }

        done(null, user);
    } catch(error) {
        done(error, false);
    }
});
