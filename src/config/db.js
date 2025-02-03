const mongoose = require("mongoose")
const connectMongoose = async () => {
   await mongoose.connect(process.env.MONGO_URL)
   console.log("DataBase Connected Succesfuly...!");
}
module.exports = connectMongoose