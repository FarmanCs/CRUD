const express = require("express")
const logOutRouter = express.Router()
const { UserLogInAuth } = require("../middleware/userAuth")
const { userlogout } = require("../controller/userlogOut")

logOutRouter.post('/user/logOut', userlogout)

module.exports = { logOutRouter }