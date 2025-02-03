const mongoose = require("mongoose")
const { todoes } = require("../model/todoesTask")

const todoesData = async (req, res) => {
   try {
      const user_id = req.user._id
      console.log("userid ", user_id);
      const { title, task } = req.body
      const todoData = new todoes({
         userid: user_id,
         title,
         task,
      })
      const data = await todoData.save()
      req.todo = data
      res.status(201).json({ data })
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const getTodoesData = async (req, res) => {
   try {
      // const user = req.user._id
      const tododata = await todoes.find({})
      res.status(200).send(tododata)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

module.exports = { todoesData, getTodoesData }

