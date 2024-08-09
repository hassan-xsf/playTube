import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

export const verifyJWT = asyncHandler(async(req,_,next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer" , "")
        if(!token) {
            throw new ApiError(401, "Unauthorized token.")
        }  
        const decodedToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!decodedToken) {
            throw new ApiError(401, "Invalid token.")
        }
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if(!user) {
            throw new ApiError(401, "Invalid token found.")
        }
        req.user = user;
        next()
    } catch (error) {
        throw new ApiError(500, error?.message || "Unable to verify token")
    }
})