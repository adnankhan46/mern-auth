import User from "../models/user.modal.js";
import bcryptjs from "bcrypt";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

export const signin = async (req, res, next) =>{
    const {email, password} = req.body;
    try {
        const validUser = await User.findOne({email});
        if (!validUser) return next(errorHandler(404, "User Not Found"));
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if (!validPassword) return next(errorHandler(401, "email or password is wrong"));
        // separating password form user & we only want nessessary things so ._doc
        const {password: hashedPassword, ...rest} = validUser._doc;
        // JWT
        const token = jwt.sign({id: validUser._id}, process.env.JWT_SECRET);
        // Ab token ko cookie me save kr denge !
        res
        .cookie("access_token", token, {httpOnly: true, maxAge: 2 * 60 * 60 * 1000})
        .status(200)
        .json(rest);
        // 2:06:49
    } catch (error) {
        next(error);
    }
}