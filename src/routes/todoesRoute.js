const express = require("express")
const router = express.Router()
const { todoAuth } = require("../middleware/todoesAuth")
const { todoesData, getTodoesData } = require("../controller/userTodoController")
const { userAuth } = require("../middleware/userAuth")


router.post("/user/todoes", todoAuth, todoesData)
router.get("/user/todoes/data", todoAuth, getTodoesData)


module.exports = { router }