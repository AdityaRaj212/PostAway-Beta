import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

console.log('MongoDB URI:', process.env.MONGO_URI);

// const url = "mongodb://127.0.0.1:27017/post-away";
const url = process.env.MONGO_URI;

export const connectUsingMongoose = async () => {
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
    }catch(err){
        console.log('Error while connecting to DB: ' + err);
    }
}