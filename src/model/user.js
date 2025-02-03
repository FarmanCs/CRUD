const mongoose = require("mongoose")
// const { type } = require("os")

const userData = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      maxLength: [20, "Name should be less then 20 characters!"],
      minLength: [3, "Name at least have 3 characters!"]
   },
   email: {
      type: String,
      unique: true,
      required: [true, "Email Must Required For Rigistraion"],
   },
   address: {
      type: String,
      state: {
         type: String,
      },
      city: {
         type: String,
      }

   },
   gender: {
      type: String,
      required: true,
      enum: {
         values: ["male", "female"],
         message: "Only clear gender are allowed...!"
      }
   },
   skills: {
      type: String,
      required: true,
   },
   contact: {
      type: String,
      required: true,
   },
   password: {
      type: String,
      required: true
   }
})

// const userInfo = new mongoose.model("user", userData)
exports.userInfo = mongoose.model("user", userData)
// module.exports = userInfo 