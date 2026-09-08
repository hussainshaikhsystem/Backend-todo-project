import mongoose from 'mongoose';

const userschema = new mongoose.Schema({
    username: {type: String, required: true},
    email: {type: String, unique: true},
    password: {type: String, required: true}
})
export const usermodel = mongoose.model('User', userschema)