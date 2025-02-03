const mongoose = require("mongoose")
const { todoes } = require("../model/todoesTask")
const jwt = require("jsonwebtoken")

const todoesData = async (req, res) => {
   try {
      const user_id = req.user._id
      // console.log("userid ", user_id);
      const { title, task } = req.body
      const todoData = new todoes({
         userid: user_id,
         title,
         task,
      })
      const data = await todoData.save()
      // console.log(data);

      req.todo = data
      res.status(201).json({ data })
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const getTodoesData = async (req, res) => {
   try {
      // const uid = req.user._id
      // // const { token } = req.cookies
      // console.log("userid", uid);

      // if (!token) {
      //    throw new Error("Token is not valide any more ")
      // }
      // const decodeToken = await jwt.verify(token, process.env.PRIVATE_KEY)
      // if (!decodeToken) {
      //    throw new Error("Token decoding problem...!")
      // }
      // const { _id } = decodeToken
      // console.log("Decoded and De_Structuring id ", typeof (_id), _id);

      // if (!(uid == _id)) {
      //    throw new Error("user is not login...")
      // }
      const userData = await todoes.find({})
      res.status(200).send(userData)

   } catch (error) {
      res.status(400).send("Error " + error.message)
   }
}

const getTodoesDataById = async (req, res) => {
   try {
      const user_id = req.params.id
      const tododata = await todoes.findById({ _id: user_id })
      res.status(200).send(tododata)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const updateTodoeslist = async (req, res) => {
   try {
      const user_id = req.params.id

      const updateTodoList = await todoes.findByIdAndUpdate(
         { _id: user_id },
         req.body,
         { new: true })
      res.status(200).send(updateTodoList)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const replaceTodoes = async (req, res) => {
   try {
      const user_id = req.params.id

      const replaceList = await todoes.findOneAndReplace(
         { _id: user_id },
         req.body,
         { new: true })
      res.status(200).send(replaceList)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const deleteTodolist = async (req, res) => {
   try {
      const user_id = req.params.id

      const deletedata = await todoes.findByIdAndDelete(
         { _id: user_id },
         // req.body,
         { new: true })
      res.status(200).send(deletedata)
   } catch (error) {
      res.status(400).send(error.message)
   }
}


module.exports = { todoesData, getTodoesData, getTodoesDataById, updateTodoeslist, replaceTodoes, deleteTodolist }

