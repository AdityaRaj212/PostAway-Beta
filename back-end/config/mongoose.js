import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

// const url = "mongodb://127.0.0.1:27017/post-away";

export const connectUsingMongoose = async () => {
    try{
        const url = process.env.MONGO_URI;
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
    }catch(err){
        console.log('Error while connecting to DB: ' + err);
    }
}