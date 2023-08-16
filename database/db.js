import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const DB = process.env.DATABASE

const Connection =async()=> {
const URL = DB;
try {
   await mongoose.connect(URL,{useUnifiedTopology:true, useNewUrlParser:true})
   console.log("Database Connected")
} catch (error) {
    console.log(`Error while connecting`,error)
}
}

export default  Connection;