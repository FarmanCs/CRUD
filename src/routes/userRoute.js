const express = require("express")
const userRouter = express.Router()
const { userAuth, UserLogInAuth } = require("../middleware/userAuth")
const { CreateUser, getUserData, getUserDataById, updateUser, replaceUser, deleteUser } = require("../controller/userConroller")
const { forgotPassword } = require("../controller/forgotPassword")
const { forgotUserPassword } = require("../middleware/forgotpassword")

const { logInUser } = require("../controller/userLogIn")

userRouter.post("/user", userAuth, CreateUser)
userRouter.post("/user/logIn", UserLogInAuth, logInUser)

userRouter.get('/user', getUserData)
userRouter.get('/user/:id', getUserDataById)
userRouter.patch('/user/update/:id', updateUser)
userRouter.put('/user/replace/:id', replaceUser)
userRouter.delete("/user/delete/:id", deleteUser)

userRouter.patch('/user/forgotpassword/:id', forgotUserPassword, forgotPassword)




module.exports = {
   userRouter
}