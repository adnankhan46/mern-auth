import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// Importing Routes
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
// middleware
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname, "frontend","dist","index.html"));
});

// Middleware modules
app.use(express.json());
app.use(cookieParser());

// User Routes
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.use((err, req, res, next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internqal Server Error";
    return res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

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