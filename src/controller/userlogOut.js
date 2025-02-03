const model = require("../model/user")

const userlogout = (req, res) => {
   try {

      const token = req.cookie
      res.cookie("token", null, { expires: new Date(Date.now()) })// expires: new Date(Date.now()) }
      res.send("Logout secces...!")
   } catch (error) {
      throw new Error(error.message)
   }
}

module.exports = { userlogout }