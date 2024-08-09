import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import {Like} from '../models/like.model.js'
import {Video} from '../models/video.model.js'
import { ApiError } from '../utils/ApiError.js'
import {uploadFile, deleteFile } from '../utils/cloudinary.js'
import { ApiResponse } from '../utils/ApiResonse.js'

const getAllVideos = asyncHandler(async (req,res) => {

    const videos = await Video.find();

    return res.status(200).json(
        new ApiResponse(200, videos, "All videos succesfully fetched!")
    )
})

const uploadVideo = asyncHandler(async (req,res) => {
    const {title,description} = req.body;
    if(title.trim() === "" || description.trim() === "") {
        throw new ApiError(400,"Both fields are compulsory")
    }
    const thumbnail = req.files.thumbnail[0].path;
    const video = req.files.video[0].path;
    if(!thumbnail) {
        return new ApiError(400,"Thumbnail not found!")
    }
    if(!video) {
        return new ApiError(400,"Video not found!")
    }
    const uploadThumbnail = await uploadFile(thumbnail);
    if(!uploadThumbnail) {
        throw new ApiError(400,"There was a problem uploading thumbnail")
    }
    const uploadVideo = await uploadFile(video);
    if(!uploadVideo) {
        throw new ApiError(400,"There was a problem uploading video")
    }
    const uploadedVideo = await Video.create({
        title,
        description,
        thumbnail: uploadThumbnail.url,
        videoFile: uploadVideo.url,
        owner: req.user?._id,
        duration: uploadVideo.duration
    })
    if(!uploadedVideo) {
        throw new ApiError(400,"There was a problem creating the video")
    }
    return res.status(200).json(
        new ApiResponse(200,uploadedVideo,"Video succesfully uploaded!")
    )
})
const deleteVideo = asyncHandler(async (req,res) => {
    const {videoId} = req.params;
    if(!videoId) {
        throw new ApiError(400,"Video not found!")
    }
    const deleteVideo = await Video.findOneAndDelete({
        _id: videoId,
        owner: req.user._id
    })
    //leting likes and comments for the particular video
    if(deleteVideo) { 
        await Like.deleteMany({
            video: videoId
        })
        // await Comment.deleteMany({
        //     video: videoId
        // })
    }
    else throw new ApiError(400,"There was a problem while deleting the video")
    return res.status(200).json(
        new ApiResponse(200,{},"Video has been succesfully deleted!")
    )
})
const getVideoById = asyncHandler(async (req,res) => {
    const {videoId} = req.params;

    const video = await Video.findById(videoId);
    if(!video) {
        throw new ApiError(300,"Video not found!")
    }
    return res.status(200).json(
        new ApiResponse(200,video,"Video data fetched")
    )
})
export {
    uploadVideo,
    deleteVideo,
    getVideoById,
    getAllVideos
}