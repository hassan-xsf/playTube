import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {Like} from '../models/like.model.js'
import {Video} from '../models/video.model.js'
import {Comment} from '../models/comment.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResonse.js'

const toggleVideoLike = asyncHandler(async (req,res) => {
    const {videoId} = req.params;

    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(400,"Video not found!")
    }
    const likeFound = await Like.findOneAndDelete(
        {video: videoId},
        {likeBy: req.user._id},
    )
    let like;
    if(!likeFound) {
        like = await Like.create({
            video: videoId,
            likedBy: req.user._id 
        })
        if(!like) {
            throw new ApiError(400,"There was a problem liking this video")
        }
    }
    const totalLikes = await Like.countDocuments({video: videoId})

    return res.status(200).json(
        new ApiResponse(200,{liked: likeFound ? false : true , totalLikes: totalLikes}, likeFound ? "Video disliked" : "Video liked")
    )
})
const toggleCommentLike = asyncHandler(async (req,res) => {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId)
    if(!comment) {
        throw new ApiError(400,"Video not found!")
    }
    const commentLikeFound = await Comment.findOneAndDelete(
        {comment: commentId},
        {likeBy: req.user._id}
    )
    let clData;
    if(!commentLikeFound) {
        clData = await Like.create({
            comment: commentId,
            likedBy: req.user._id 
        })
        if(!clData) {
            throw new ApiError(400,"There was a problem liking this video")
        }
    }


    return res.status(200).json(
        new ApiResponse(200, clData, likeFound ? "Comment disliked" : "Comment liked")
    )
})

const hasLikedVideo = asyncHandler(async (req,res) => {
    const {videoId} = req.params;
    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(400,"Video not found!")
    }
    const found = await Like.findOne(
        {video: videoId},
        {likedBy: req.user?._id}
    )
    return res.status(200).json(
        new ApiResponse(200, {liked: found ? true : false},"The user like on video has been fetched!")
    )    
})
const hasLikedComment = asyncHandler(async (req,res) => {
    const {commentId} = req.params;
    const comment = await Comment.findById(commentId)
    if(!comment) {
        throw new ApiError(400,"Comment not found!")
    }
    const found = await Like.findOne(
        {comment: commentId},
        {likedBy: req.user?._id}
    )
    return res.status(200).json(
        new ApiResponse(200,found ? {found} : {},"The user like on comment has been fetched!")
    )    
})
const getTotalVideoLikes = asyncHandler(async (req,res) => {
    const {videoId} = req.params;

    const video = await Video.findById(videoId)
    if(!video) {
        throw new ApiError(400,"Video not found!")
    }
    const totalLikes = await Like.countDocuments({video: videoId})
    return res.status(200).json(
        new ApiResponse(200,totalLikes,"Total Video likes fetched")
    )
})
const getTotalCommentLikes = asyncHandler(async (req,res) => {
    const {commentId} = req.params;

    const comment = await Comment.findById(commentId)
    if(!comment) {
        throw new ApiError(400,"Comment not found!")
    }
    const totalLikes = await Like.countDocuments({comment: commentId})
    return res.status(200).json(
        new ApiResponse(200,totalLikes,"Total Comment likes fetched")
    )
})
export {
    toggleVideoLike,
    toggleCommentLike,
    getTotalVideoLikes,
    getTotalCommentLikes,
    hasLikedComment,
    hasLikedVideo
}