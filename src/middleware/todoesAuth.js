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
      // console.log(decodedMessage);
      if (!decodedMessage) {
         throw new Error("token decoding problem")
      }
      const { _id } = decodedMessage
      // console.log("User_ID: ", _id);

      const userData = await userModel.userInfo.findById({ _id: _id })
      // console.log(userData);
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