import mongoose from "mongoose";
import 'dotenv/config'
import { DB_NAME } from "../constants.js";

const connectDB = async () => {
   try {
      const instance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
      console.log("Database connected at host: " + instance.connection.host);
   } catch (error) {
      console.log("There was a problem connecting to database: " + error)
      process.exit(1)
   }
}

export default connectDB;