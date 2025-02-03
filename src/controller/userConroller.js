const mongoose = require("mongoose")
const userSchema = require("../model/user")
const bycrpt = require("bcrypt")
const jwt = require("jsonwebtoken")


const CreateUser = async (req, res) => {
   try {
      const { name, email, address, gender, contact, skills, password } = req.body
      const hashedPassword = await bycrpt.hash(password, 10)
      const userData = new userSchema.userInfo({
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
         user
      })
   } catch (error) {
      res.status(400).send(error.message)
   }
}


const getUserData = async (req, res) => {
   try {
      const userData = await userSchema.userInfo.find({})
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const getUserDataById = async (req, res) => {
   try {
      const uid = req.params.id
      const { token } = req.cookies
      // console.log(token);

      if (!token) {
         throw new Error("Token is not valide any more ")
      }
      const decodeToken = await jwt.verify(token, process.env.PRIVATE_KEY)
      const { id } = decodeToken
      const userData = await userSchema.userInfo.findById({ _id: id })
      res.status(200).send(userData)

   } catch (error) {
      res.status(400).send("Error " + error.message)
   }
}


const updateUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.userInfo.findByIdAndUpdate({ _id: uid }, req.body, { new: true })
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

const replaceUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.userInfo.findOneAndReplace({ _id: uid }, req.body, { new: true })
      // const replaceUser = await userData.save()
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}


const deleteUser = async (req, res) => {
   try {
      const uid = req.params.id
      const userData = await userSchema.userInfo.findOneAndDelete({ _id: uid })
      res.status(200).send(userData)
   } catch (error) {
      res.status(400).send(error.message)
   }
}

module.exports = {
   CreateUser, getUserData, getUserDataById, updateUser, replaceUser, deleteUser
}