import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Comment } from '../models/comment.model.js'
import { Video } from '../models/video.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResonse.js'


const viewComments = asyncHandler(async (req,res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "Video not found!")
    }

    const comments = await Comment.find(
        {video: videoId}
    )

    return res.status(200).json(
        new ApiResponse(200, comments, "Comment's succesfully fetched!")
    )
})

const addComment = asyncHandler(async (req, res) => {
    const { videoId, content } = req.body;

    if (!content || content.trim() === "") {
        throw new ApiError(400, "Content must not be empty!")
    }
    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "Video not found!")
    }
    const comment = await Comment.create({
        video: videoId,
        content: content,
        owner: req.user._id
    })
    if (!comment) {
        throw new ApiError(400, "There was a problem commenting on the video")
    }

    return res.status(200).json(
        new ApiResponse(200, comment, "Comment succesfully posted!")
    )
})


const deleteComment = asyncHandler(async (req, res) => {
    const { videoId } = req.params;

    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "Video not found!")
    }
    const comment = await Comment.findOneAndDelete(
        { video: videoId },
        { owner: req.user._id },
    )
    if (!comment) {
        throw new ApiError(400, "Comment not found or not associated with the user")
    }

    return res.status(200).json(
        new ApiResponse(200, comment, "Comment has been deleted")
    )
})

export {
    addComment,
    deleteComment,
    viewComments
}