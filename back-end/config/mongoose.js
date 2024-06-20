import mongoose from "mongoose";

const url = "mongodb://127.0.0.1:27017/post-away";

export const connectUsingMongoose = async () => {
    try{
        await mongoose.connect(url);
        console.log('MongoDB is connected using mongoose');
    }catch(err){
        console.log('Error while connecting to DB: ' + err);
    }
}