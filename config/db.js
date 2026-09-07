import mongoose from 'mongoose';

export const connectdb = async() => {
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("databse connected")
    }catch(err){
        console.log("error in db connection", err.message);
        process.exit(1)
    }
}