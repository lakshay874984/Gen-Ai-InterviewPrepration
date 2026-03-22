const jwt = require("jsonwebtoken")
const blacklistTokenModel = require("../models/blacklist.model")


async function authUser(req, res, next) {
    // get the token from the request cookies
    const token = req.cookies.token
    // if token is not present, return error message
    if(!token) {
        return res.status(401).json({ message : "Unauthorized, token not found" })
    }
    if(await blacklistTokenModel.findOne({ token })) {
        return res.status(401).json({ message : "Unauthorized, token is invalid" })
    }
    // if token is present, verify the token and extract the user details from it
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(401).json({ message : "Unauthorized, invalid token" })
    }
}

module.exports = {authUser }