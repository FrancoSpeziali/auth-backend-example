const jsonwebtoken = require("jsonwebtoken");

exports.issueJwt = async (user) => {

    const payload = {
        id: user._id,
        iat: Date.now()
    }

    return await jsonwebtoken.sign(payload, process.env.SECRET, {
        expiresIn: "1h"
    })
}
