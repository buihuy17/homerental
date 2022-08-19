import mongoose from 'mongoose';

export async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/homerental');
        console.log("Connect Successfully To MongoDB!");
    } catch (error) {
        console.log("Connect Fail To MongoDB!");
    }
}