import mongoose from "mongoose"
//first create a async function

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)//await basically says take as much time as you need
        console.log("MongoDB connected")
    } catch (error) {
        console.error("Moongose connection error",error)
        process.exit(1)
    }
}

//so this your basic mongoDB code that can be used in any other project
export default connectDB