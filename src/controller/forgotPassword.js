const { forgotUserPassword } = require("../middleware/forgotpassword")
const model = require("../model/user")
const bycrpt = require("bcrypt")

const forgotPassword = async (req, res) => {

   try {
      // const { password } = req.body
      const user = req.user
      // const hashnewpassword = await bycrpt.hash(password, 10)
      // const forget = await model.userInfo.findByIdAndUpdate({ _id: user._id }, { password: hashnewpassword }, { new: true })
      res.status(202).send(user)
   } catch (error) {
      res.status(400).send("forgot password succesfuly : " + error.message)
   }
}

module.exports = { forgotPassword }