const express = require("express")
const authRouter = express.Router()
const authController = require("../controllers/auth.controller")
const authUser = require("../middlewares/auth.middleware")


/**
 * @route POST /api/auth/register
 * @desc Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @desc Login a user
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)

/**
 * @route GET /api/auth/logout
 * @desc Logout a user by blacklisting the token
 * @access Public
 * 
 */

authRouter.get("/logout", authController.logoutUserController)
 
/**
 * @route GET /api/auth/get-me
 * @desc Get the details of the logged in user, expects a valid JWT token in the request cookies
 * @access Private
 */

authRouter.get("/get-me", authUser.authUser, authController.getMeController)



module.exports = authRouter