const model = require("../model/user")

const forgotPassword = async (req, res) => {
   try {
      const user = req.user
      res.status(202).send(user)
   } catch (error) {
      res.status(400).send("forgot password succesfuly : " + error.message)
   }
}

module.exports = { forgotPassword }