const mongoose = require("mongoose")
const userSchema = require("../model/user")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")


const CreateUser = async (req, res) => {
   try {
      const { name, email, address, gender, contact, skills, password } = req.body
      const hashedPassword = await bycrpt.hash(password, 10)
      const userData = new userSchema({
         name,
         email,
         address,
         skills,
         gender,
         contact,
         password: hashedPassword
      })
      const user = await userData.save()
      res.status(201).json({
         message: "new user added successfully",
         user
      })
   } catch (error) {
      res.status(400).send(error.message)
   }
}


const getUserData = async (req, res) => {
   try {
      const { token } = req.cookies
      if (!token) {
         throw new Error("Token is not valide any more ")
      }
      const userData = await userSchema.find({})
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const getUserDataById = async (req, res) => {
   try {
      const uid = req.params.id
      const { token } = req.cookies
      if (!token) {
         throw new Error("Token is not valide any more ")
      }
      const decodeToken = await jwt.verify(token, process.env.PRIVATE_KEY)
      if (!decodeToken) {
         throw new Error("Token decoding problem...!")
      }
      const { _id } = decodeToken
      if (!(uid == _id)) {
         throw new Error("user is not login...")
      }
      const userData = await userSchema.findById({ _id: _id })
      res.status(200).send(userData)

   } catch (error) {
      res.status(400).send("Error " + error.message)
   }
}


const updateUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.findByIdAndUpdate({ _id: uid }, req.body, { new: true })
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const replaceUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.findOneAndReplace({ _id: uid }, req.body, { new: true })
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}


const deleteUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.findOneAndDelete({ _id: uid })
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

module.exports = {
   CreateUser, getUserData, getUserDataById, updateUser, replaceUser, deleteUser
}