const userModel = require("../model/user")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bycrpt = require("bcrypt")

const userAuth = (req, res, next) => {
   try {
      const { email, password } = req.body
      const validEmail = validator.isEmail(email)
      const strongPassword = validator.isStrongPassword(password)
      if (!validEmail) {
         throw new Error("invalid creation, try again...!" + validEmail)
         // return console.log("invalid creation, try again...!", validEmail)
      } else if (!strongPassword) {
         throw new Error("password is not enough Strong!")
      }
   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}


const UserLogInAuth = async (req, res, next) => {
   try {

      const { email, password } = req.body
      // const { email, password } = req.body
      // const validEmail = validator.isEmail(email)
      // const strongPassword = validator.isStrongPassword(password)
      // if (!validEmail) {
      //    throw new Error("invalid creation, try again...!" + validEmail)
      // }
      // if (!strongPassword) {
      //    throw new Error("password is not enough Strong!")
      // }

      const checkUser = await userModel.findOne({ email: email })
      if (!checkUser) {
         throw new Error("signUp befor login for this user " + email)
      }
      req.user = checkUser
      const passwordValide = await bycrpt.compare(password, req.user.password)
      if (passwordValide) {
         const token = await jwt.sign({ _id: req.user._id }, process.env.PRIVATE_KEY)
         res.cookie("token", token)
         // res.status(200).send("The LogedIn user is : " + User)
      }
      else {
         throw new Error("password is not valide...")
      }
   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}
// module.exports = { UserLogInAuth }



module.exports = { userAuth, UserLogInAuth }