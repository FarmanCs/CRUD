const model = require("../model/user")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bycrpt = require("bcrypt")

const logInUser = async (req, res) => {
   try {
      const User = req.user
      res.status(200).send("The LogedIn user is : " + User)
   } catch (error) {
      res.status(400).send(error.message)
   }
}
module.exports = { logInUser }