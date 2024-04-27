import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Importing Routes
import userRoutes from "./routes/user.route.js";

dotenv.config();
const app = express();

// User Routes
app.use("/api/user", userRoutes);

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("Connected to MONGODB")
}).catch((err)=>{
    console.log(err);
});


app.get("/helloworld", (req, res)=>{
    res.json({
        message: "Hello World"
    });
})


app.listen(3000, ()=>{
    console.log("Server listening on PORT 3000");
});