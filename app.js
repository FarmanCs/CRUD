const express = require("express")
const MongooseConnection = require("./src/config/db")
require('dotenv').config()

const cookies = require("cookie-parser")

const { userRouter } = require("./src/routes/userRoute")
const { router } = require("./src/routes/todoesRoute")
const app = express()

app.use(express.json())
app.use(cookies())


app.use('/', userRouter)
app.use('/', router)






MongooseConnection().then(() => {
   app.listen(process.env.PORT, () => {
      console.log("Server started at PORT", process.env.PORT);
   })
}).catch((error) => {
   console.log("Error: ", error.message);

})









