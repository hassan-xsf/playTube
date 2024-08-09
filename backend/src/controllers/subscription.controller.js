import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { Subscription } from '../models/subscription.model.js'
import { Video } from '../models/video.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResonse.js'


const getChannelSubscribers = asyncHandler(async (req, res) => {
    const { channel } = req.params;
    if (!channel) {
        throw new ApiError(200, "Video not found!")
    }
    const channelSubs = await User.aggregate(
        [
            {
                $match: {
                    username: channel?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "_id",
                    foreignField: "channel",
                    as: "subscribedTo",
                    pipeline: [
                        {
                            $project: {
                                channel: 1
                            }
                        }
                    ]
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "subscribedTo.channel",
                    foreignField: "_id",
                    as: "subscribedToName",
                    pipeline: [
                        {
                            $project: {
                                username: 1,
                                fullname: 1,
                                avatar: 1
                            }
                        }
                    ]
                }
            },
            {
                $unwind: "$subscribedToName"
            },
            {
                $project: {
                    totalSubscribedTo: 1,
                    subscribedToName: 1,
                    chanelSubscribers: 1,
                    createdAt: 1
                }
            }
        ])
    if (!channelSubs.length) {
        throw new ApiError(400, "Channel doesn't exists or there was a problem.")
    }
    return res.status(200).json(
        new ApiResponse(200, channelSubs, "User's subscribed to channels data fetched succesfully.")
    )
})

const toggleSubscribeChannel = asyncHandler(async (req, res) => {
    const { channel } = req.params;
    if (!channel) {
        throw new ApiError(200, "Video not found!")
    }

    const findChannel = await User.findOne({
        username: channel
    }).select("-password -refreshToken -accessToken")

    if (!findChannel) {
        throw new ApiError(400, "Channel doesn't exists or there was a problem.")
    }

    const subFound = await Subscription.findOneAndDelete(
        { channel: findChannel._id },
        { subscriber: req.user._id }
    )

    let sub;
    if (!subFound) {
        sub = await Subscription.create({
            channel: findChannel._id,
            subscriber: req.user._id
        })
        if (!sub) {
            throw new ApiError(300, "There was a problem subscribing the channel")
        }
    }


    return res.status(200).json(
        new ApiResponse(200, sub, subFound ? "Channel un-subscribed" : "Channel subscribed")
    )

})

const toggleSubscribeVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(200, "Video not found!")
    }

    const findChannel = await Video.findById({
        _id: videoId
    }).select("-videoFile -thumbnail -title -description -duration")

    if (!findChannel) {
        throw new ApiError(400, "Channel doesn't exists or there was a problem.")
    }

    const subFound = await Subscription.findOneAndDelete(
        { channel: findChannel.owner },
        { subscriber: req.user._id }
    )

    let sub;
    if (!subFound) {
        sub = await Subscription.create({
            channel: findChannel.owner,
            subscriber: req.user._id
        })
        if (!sub) {
            throw new ApiError(300, "There was a problem subscribing the channel")
        }
    }


    return res.status(200).json(
        new ApiResponse(200, sub, subFound ? "Channel un-subscribed" : "Channel subscribed")
    )

})

const isSubscribed = asyncHandler(async (req, res) => {
    const { videoId } = req.params;
    if (!videoId) {
        throw new ApiError(200, "Video not found!")
    }

    const findChannel = await Video.findById({
        _id: videoId
    }).select("-videoFile -thumbnail -title -description -duration")

    console.log(findChannel)
    if (!findChannel) {
        throw new ApiError(400, "Channel doesn't exists or there was a problem.")
    }
    const found = await Subscription.findOne({
        channel: findChannel.owner,
        subscriber: req.user._id
    })
    return res.status(200).json(
        new ApiResponse(200, {}, (found ? "The user is subscribed!" : "The user is not subscribed"))
    )
})

export {
    isSubscribed,
    toggleSubscribeChannel,
    toggleSubscribeVideo,
    getChannelSubscribers
}