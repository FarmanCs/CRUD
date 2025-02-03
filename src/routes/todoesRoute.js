const express = require("express")
const router = express.Router()
const { todoAuth } = require("../middleware/todoesAuth")
const { todoesData, getTodoesData, getTodoesDataById, updateTodoeslist, replaceTodoes } = require("../controller/userTodoController")
const { userAuth } = require("../middleware/userAuth")


router.post("/user/todoes", todoAuth, todoesData)
router.get("/user/todoes/data", todoAuth, getTodoesData)
router.get("/user/todoes/data/:id", todoAuth, getTodoesDataById)
router.patch("/user/todoes/update/:id", todoAuth, updateTodoeslist)
router.put("/user/todoes/replace/:id", todoAuth, replaceTodoes)


module.exports = { router }