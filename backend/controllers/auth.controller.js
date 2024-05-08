import User from "../models/user.modal.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) =>{
    const {username, email, password} = req.body;
    const hashedPassword = bcryptjs.hashSync(password, 10);
    const newUser = new User({username, email, password:hashedPassword});
    try {
        await newUser.save();
        res.status(201).json({
            message: "User Created Successful"
        });
        
    } catch (error) {
      /* next(error); */ // For global Error
      /*  next(errorHandler(500, "something went wrong")); */  // for Custom error
      next(error);
    };
}