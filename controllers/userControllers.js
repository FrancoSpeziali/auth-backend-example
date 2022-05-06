const bcrypt = require("bcrypt");
const User = require("../models/User");
const { issueJwt } = require("../helpers/jwt")

exports.checkUsername = (req, res) => {};

exports.resetPassword = (req, res) => {
    res.send("reset password ok");
};

exports.registration = async (req, res) => {
    const { body } = req;

    try {
        const hashedPassword = await bcrypt.hash(body.password, 10);

        const newUser = await User.create({
            email: body.email,
            password: hashedPassword
        });

        res.send({
            message: "New user created",
            email: newUser.email,
            id: newUser._id
        });
    } catch(error) {
        console.log(error)
        res.status(500).send("An error occurred");
    }
}

exports.login = async (req, res) => {
    const { body, user } = req;

    try {
        const match = await bcrypt.compare(body.password, user.password);

        if(!match) {
            throw "Password does not match"
        }

        const token = await issueJwt(user);
        res.send({ message: "Login successful", token })
    } catch (error) {
        res.status(500).send(error);
    }
};