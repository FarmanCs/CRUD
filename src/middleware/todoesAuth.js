const model = require("../model/todoesTask")
const userModel = require("../model/user")
const jwt = require("jsonwebtoken")
const todoAuth = async (req, res, next) => {
   try {
      const { token } = req.cookies
      if (!token) {
         throw new Error("Token is not valide...")
      }
      const decodedMessage = await jwt.verify(token, "Crud@2025")
      if (!decodedMessage) {
         throw new Error("token decoding problem")
      }
      const { _id } = decodedMessage
      const userData = await userModel.findById({ _id: _id })
      if (!userData) {
         throw new Error("cant post before signUp")
      }
      req.user = userData
   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}
module.exports = { todoAuth }