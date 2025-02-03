const model = require("../model/todoesTask")
const { userAuth } = require("../middleware/userAuth")
const userModel = require("../model/user")
const jwt = require("jsonwebtoken")
const todoAuth = async (req, res, next) => {
   try {
      const { token } = req.cookies
      if (!token) {
         // res.cookie("token", token)
         throw new Error("Token is not valide...")
         // res.status(200).send("The LogedIn user is : " + User)
      }
      // const user = req.user
      // console.log(user);
      const decodedMessage = await jwt.verify(token, "Crud@2025")
      // const { userid } = decodedMessage
      // else {

      // }
      // const { title, task } = req.body
      if (!decodedMessage) {
         throw new Error("token decoding problem")
      }
      // console.log("user to add taske:", user);
      // console.log(userid);
      const userData = await userModel.userInfo.findOne({ _id: userid })
      // const userData = await userModel.userInfo.findById({ _id: userid })
      if (!userData) {
         throw new Error("cant post before signUp")
      }
      // const todosData = new model.todoes({
      //    userid: userData._id,
      //    title,
      //    task
      // })
      // req.user = userData

      // const token = await jwt.sign({ _id: req.User._id }, process.env.PRIVATE_KEY)
   } catch (error) {
      res.status(400).send(error.message)
   }
   next()
}
module.exports = { todoAuth }