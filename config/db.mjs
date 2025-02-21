import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

//Save mongoURI connection string to variable
const db = process.env.mongoURI;

 async function connectDB(){
   try {
         await mongoose.connect(db);

         console.log("Mongo DB Connected....")

   } catch (err) {
      console.error(err);

      process.exit(1)
   }
}

export default connectDB;