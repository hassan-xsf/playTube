import { asyncHandler } from '../utils/asyncHandler.js'
import { ApiError } from '../utils/ApiError.js'
import { User } from '../models/user.model.js'
import {uploadFile, deleteFile } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResonse.js'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'

const generateTokens = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const registerUser = asyncHandler(async (req, res) => {

    const { username, email, password, fullname } = req.body

    if (
        [username, email, password, fullname].some((field) => field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are compulsary")
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] })
    if (existedUser) {
        throw new ApiError(400, "User with email or username already exists!")
    }
    const avatarLocalPath = req.files?.avatar[0].path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required")
    }

    let coverImage;
    if (Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        const coverLocalPath = req.files.coverImage[0].path;
        coverImage = await uploadFile(coverLocalPath);
    }
    const avatar = await uploadFile(avatarLocalPath)

    if (!avatar) throw new ApiError(400, "Avatar file is required")

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || ""
    })
    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while creating the user")
    }

    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered succesfully!")
    )
})
/// Get user's details
/// Check if the user details are empty
/// Check if the username exists in the database
/// Check if the password is connect
/// Generate the relative tokens.
/// send cookie

const loginUser = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    if (!email && !username)
        throw new ApiError(400, "Username or email is compulsary")
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (!user)
        throw new ApiError(400, "Account doesn't exists")
    const match = await user.isPasswordCorrect(password)
    if (!match)
        throw new ApiError(400, "Incorrect Password")

    const { accessToken, refreshToken } = await generateTokens(user._id)

    const loggedInUser = await User.findById(user._id)
        .select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200, {
                user: loggedInUser, accessToken, refreshToken
            },
                "User logged in succesfully")
        )

})

const logoutUser = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1
            }
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User has been logged out"))
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    const token = req.cookies.refreshToken || req.header("Authorization")?.replace("Bearer", "")

    if (!token) {
        throw new ApiError(400, "Refresh token not found!")
    }

    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
    if (!decodedToken)
        throw new ApiError(400, "Invalid token found")
    const user = await User.findById(decodedToken?._id).select("-password")
    if (!user)
        throw new ApiError(400, "Invalid token, No user found!")

    if (user.refreshToken !== token) {
        throw new ApiError(400, "Refresh token is somehow expired")
    }
    const { accessToken, refreshToken } = await generateTokens(user._id)

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(200,
                { accessToken, refreshToken },
                "New tokens generated!")
        )

})

const changeUserPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const user = User.findById(req.user._id)
    if (!user) {
        throw new ApiError(400, "User data not found!")
    }
    const match = await user.isPasswordCorrect(oldPassword)
    if (!match)
        throw new ApiError(400, "IncorrectOld Password")
    if (oldPassword == newPassword)
        throw new ApiError(400, "Password should be new")

    user.password = newPassword;
    await user.save({ validateBeforeSave: false });

    return res.status(200).json(
        new ApiResponse(200, {}, "Password has been succesfully updated.")
    )
})

const getCurrentUser = asyncHandler(async (req, res) => {
    return res.status(200).json(
        new ApiResponse(200, req.user, "User data has been fetched")
    )
})
const updateAccountDetails = asyncHandler(async (req, res) => {
    const { email, fullname } = req.body;
    const user = User.findById(req.user._id).select("-password")
    if (!user) {
        throw new ApiError(400, "User data not found!")
    }
    if (!email || !username) {
        throw new ApiError(400, "Both fields are required")
    }
    const isTaken = User.findOne({ email: email })
    if (isTaken) {
        throw new ApiError(400, "Email is already taken")
    }
    user.email = email;
    user.fullname = fullname;
    user.save({ validateBeforeSave: false })

    return res.status(200).json(
        new ApiResponse(200, user, "Account details updatead succesfully!")
    )
})
const updateUserAvatar = asyncHandler(async (req, res) => {
    const avatarFile = req.file?.path;
    const oldAvatarFile = req.user.avatar;
    if (!avatarFile) {
        throw new ApiError(400, "No avatar file present")
    }
    const avatar = await uploadFile(avatarFile)
    if (!avatar) {
        throw new ApiError(400, "There was a problem uploading the avatar")
    }
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:
            {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")
    if (!user) {
        throw new ApiError(400, "There was a problem updating the avatar")
    }
    await deleteFile(oldAvatarFile);
    return res.status(200)
        .json(
            new ApiResponse(200, user, "User Avatar updated succesfully!")
        )
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverFile = req.file?.path;
    const oldCoverImage = req.user.coverImage;
    if (!coverFile) {
        throw new ApiError(400, "No cover file file present")
    }
    const cover = await uploadFile(coverFile)
    if (!cover) {
        throw new ApiError(400, "There was a problem uploading the cover image")
    }
    const user = await User.findByIdAndUpdate(req.user?._id,
        {
            $set:
            {
                coverImage: cover.url
            }
        },
        { new: true }
    ).select("-password")
    if (!user) {
        throw new ApiError(400, "There was a problem updating the cover image")
    }
    await deleteFile(oldCoverImage);
    return res.status(200)
        .json(
            new ApiResponse(200, user, "Cover Image updated succesfully!")
        )
})

const getUserChannel = asyncHandler(async(req,res) => {
    const {username} = req.params;
    if(!username.trim()) throw new ApiError(400,"Channel name doesn't exists")

    const channelUser = await User.aggregate([
        {
            $match: 
            {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: {
                from: "subscriptions", //Getting all the user's subscribers
                localField: "_id",
                foreignField: "subscriber",
                as: "totalSubscribers"
            }
        },
        {
            $lookup: {
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "totalSubscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$totalSubscribers"
                },
                subscribedToCount: {
                    $size: "$totalSubscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: {$in: [req.user?._id , "$totalSubscribers.subscriber"]},
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullname: 1,
                coverImage: 1,
                avatar: 1,
                username: 1,
                subscribersCount: 1,
                subscribedToCount: 1,
                isSubscribed: 1
            }
        }
    ])
    if(!channelUser.length) {
        throw new ApiError(400,"Channel doesn't exists or there was a problem.")
    }
    return res.status(200).json(
        new ApiResponse(200,channelUser[0],"User's channnel data fetched succesfully.")
    )
})

const getWatchHistory = asyncHandler(async (req,res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id)
            },
        },
        {
            $lookup: {
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "videoOwner",
                            pipeline: [{
                                $project: {
                                    fullname: 1,
                                    username: 1,
                                    avatar: 1
                                }
                            }]
                        },
                    },
                    {
                        $addFields: {
                              owner: {
                                $first: "$videoOwner"
                              }  
                        }
                    }
                ]
            }
            // FURTHER DRILL TO AVOID user[0] ????
        }
    ])
    res.status(200).json(
        new ApiResponse(200,user[0].watchHistory,"Watch history succesfully fetched!")
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeUserPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannel,
    getWatchHistory
}