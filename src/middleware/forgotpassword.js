const model = require("../model/user")
// const jwt = require("jswonwebtoken")
// const bycrpt = require("bcrypt")

const forgotUserPassword = async (req, res, next) => {
   try {
      const { email } = req.body
      const User = await model.userInfo.findOne({ email: email })
      if (!User) {
         throw new Error("user is not present" + email)
      }
      req.user = User
      // const hashnewpassword = await bycrpt.hash(password, 10)
      // const forget = await model.userInfo.findByIdAndUpdate({ _id: User._id }, { password: hashnewpassword }, { new: true })
   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}

module.exports = { forgotUserPassword }