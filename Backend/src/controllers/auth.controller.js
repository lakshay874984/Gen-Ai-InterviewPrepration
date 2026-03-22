const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookies = require("cookie-parser")
const blacklistTokenModel = require("../models/blacklist.model")

/**
 * @name registerUserController
 * @route POST /api/auth/register
 * @desc Register a new user,expects username, email and password in the request body
 * @access Public
 */

async function registerUserController(req, res) {
    // check if all fields are provided
    const { username, email, password } = req.body
    if(!username || !email || !password) {
        return res.status(400).json({ message : "All fields are required" })
    }
    // check if user already exists with the same username or email  and the syntax to do that is await userModel.findOne({ $or : [ { username }, { email } ] })

    
    const useralreadyexists = await userModel.findOne({
        $or : [
            { username },
            { email  }
        ]
    })
    // if user already exists, return error message
    if(useralreadyexists) {
        return res.status(400).json({ message : "Username or email already exists" })
    }
    // if user does not exist, hash the password and save the user to the database
    
    else {
        try {
            // hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)
        // create a new user instance and save it to the database
        const newUser = new userModel({
            username,
            email,
            password : hashedPassword
        })
        // generate a JWT token for the user and set it as a cookie in the response
        const token = jwt.sign({id : newUser._id , username : newUser.username }, 
            process.env.JWT_SECRET, 
            { expiresIn : "1d" }
        )
        // set the token as a cookie in the response
        res.cookie("token", token)


        // save the user to the database
        await newUser.save()
        // return success message
        return res.status(201).json({ message : "User registered successfully" ,
            user : {
                id : newUser._id,
                username : newUser.username,
                email : newUser.email
            }}
        )
    }
    // catch any errors that occur during the registration process and return an error message
    catch (error) {
        // log the error to the console for debugging purposes
        console.error("Error registering user:", error)
        return res.status(500).json({ message : "Internal server error" })
    }}
}

/** @name loginUserController
 *  @route POST /api/auth/login
 *  @desc Login a user, expects email and password in the request body
 *  @access Public
 */

async function loginUserController(req, res) {
    // check if all fields are provided
    const { email, password } = req.body
    // to check if the user exists with the provided email and password, we can use the findOne method of the userModel and pass in a query object that checks for both the email and password fields. The syntax for this would be: const existingUser = await userModel.findOne({ $and : [ { email }, { password } ] })

    const user= await userModel.findOne({email})
    if(!user) {
        return res.status(400).json({ message : "Invalid email or password" })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
        return res.status(400).json({ message : "Invalid email or password" })
    }
    // if user exists, generate a JWT token for the user and set it as a cookie in the response
    const token = jwt.sign({ id : user._id, username : user.username },
        process.env.JWT_SECRET,
        { expiresIn : "1d" }
    )
    res.cookie("token", token)
    return res.status(200).json({ message : "User logged in successfully" ,
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }}
    )
        



}
/**
 * 
    * @name logoutUserController
    * @route GET /api/auth/logout
    * @desc Logout a user by blacklisting the token, expects a valid JWT token in the request cookies
    * @access Public
 */

async function logoutUserController(req, res) {

    const token = req.cookies.token
    if(token) {
        await blacklistTokenModel.create({ token })
    }
    res.clearCookie("token")
    return res.status(200).json({ message : "User logged out successfully" })


}

/**
 * @name getMeController
 * @route GET /api/auth/get-me
 * @desc Get the details of the logged in user/
 * @access Private
 */

async function getMeController(req, res) {
    // the user details will be available in the req.user object, which is set by the authUser middleware after verifying the JWT token
    const user = await userModel.findById(req.user.id)

    res.status(200).json({
        message : "User details fetched successfully",
        user : {
            id : user._id,
            username : user.username,
            email : user.email
        }
    })
}






      

module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController

}