const User = require("../models/User");

exports.validateNewUser = async (req, res, next) => {
    const { body } = req;

    try {
        const user = await User.findOne({ email: body.email });

        if(user !== null) {
            throw "User already exists";
        }

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}

exports.validateUserExists = async (req, res, next) => {

    const { body } = req;

    try {
        const user = await User.findOne({ email: body.email });

        if(user === null) {
            throw "User does not exist"
        }

        req.user = user;

        next();
    } catch (error) {
        res.status(500).send(error);
    }
}