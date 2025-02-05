const model = require("../model/user")
const bycrpt = require("bcrypt")
const validator = require("validator")

const forgotUserPassword = async (req, res, next) => {
   try {
      const { email, password } = req.body
      const User = await model.findOne({ email: email })
      if (!User) {
         throw new Error("user is not present" + email)
      }
      req.user = User
      const strongPassword = validator.isStrongPassword(password)
      if (!strongPassword) {
         throw new Error("Your password is not strong enough..! ")
      }
      const hashnewpassword = await bycrpt.hash(password, 10)
      const forget = await model.findByIdAndUpdate({ _id: req.user._id }, { password: hashnewpassword })

   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}

module.exports = { forgotUserPassword }