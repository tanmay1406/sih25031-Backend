import express from "express"
import cors from "cors"
import authRoutes from "./routes/auth.routes.js"
import dotenv from "dotenv"
dotenv.config()
const app=express()

export default app


//basic configuration
app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(express.static("public"))


app.use(cors({
    origin:process.env.CORS_ORIGIN?.split(",")||"http://localhost:5173",
    credentials:true,
    methods:["GET",'POST','PUT','PATCH','DELETE','OPTIONS'],
    allowedHeaders:['Content-Type','Authorization'],
}))

// register routes
app.use("/api/auth", authRoutes);


app.get("/",(req,res)=>{
    res.send("Hello Worold")
})