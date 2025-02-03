const mongoose = require("mongoose")
const todoSchema = new mongoose.Schema({
   userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true
   },
   title: {
      type: String,
      maxLength: [50, "Title is too big"],
      minLength: [5, "Title is too short"],
   },
   task: {
      type: String,
      enum: {
         values: ["completed", "pending", "Ongoing"],
         message: "only clear condition are allowed...!"
      }
   }
})

exports.todoes = mongoose.model("todoeslist", todoSchema)